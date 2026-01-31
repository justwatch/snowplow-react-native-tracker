import { ConfigPlugin, withProjectBuildGradle, withDangerousMod } from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * Read GitHub credentials from .npmrc
 * Looks for:
 *   //npm.pkg.github.com/:_authToken=TOKEN
 *   //npm.pkg.github.com/:username=USERNAME
 *
 * Checks project root first, falls back to ~/.npmrc
 */
function getGitHubCredentialsFromNpmrc(projectRoot: string): { username: string | null; token: string | null } {
  // Try project-level .npmrc first, then fall back to global
  const projectNpmrc = path.join(projectRoot, '.npmrc');
  const globalNpmrc = path.join(os.homedir(), '.npmrc');

  const npmrcPath = fs.existsSync(projectNpmrc) ? projectNpmrc : globalNpmrc;

  if (!fs.existsSync(npmrcPath)) {
    return { username: null, token: null };
  }

  const content = fs.readFileSync(npmrcPath, 'utf-8');
  const tokenMatch = content.match(/\/\/npm\.pkg\.github\.com\/:_authToken=(.+)/);
  const usernameMatch = content.match(/\/\/npm\.pkg\.github\.com\/:username=(.+)/);

  return {
    username: usernameMatch ? usernameMatch[1].trim() : null,
    token: tokenMatch ? tokenMatch[1].trim() : null,
  };
}

/**
 * Config plugin to add GitHub Packages Maven repository for the JustWatch
 * Snowplow Android tracker fork with pageUrl/referrer support.
 *
 * Credentials are read from ~/.npmrc:
 *   //npm.pkg.github.com/:_authToken=TOKEN
 *   //npm.pkg.github.com/:username=USERNAME
 */
export const withSnowplowAndroid: ConfigPlugin = (config) => {
  // Step 1: Write GitHub credentials to android/gradle.properties
  config = withDangerousMod(config, [
    'android',
    (modConfig) => {
      const { username, token } = getGitHubCredentialsFromNpmrc(modConfig.modRequest.projectRoot);

      if (!token || !username) {
        console.warn(
          '⚠️  @justwatch/snowplow-react-native-tracker: Could not find GitHub credentials in ~/.npmrc. ' +
          'Expected:\n' +
          '  //npm.pkg.github.com/:_authToken=YOUR_TOKEN\n' +
          '  //npm.pkg.github.com/:username=YOUR_USERNAME\n' +
          'Android build may fail to resolve com.justwatch:snowplow-android-tracker.'
        );
        return modConfig;
      }

      const gradlePropsPath = path.join(
        modConfig.modRequest.platformProjectRoot,
        'gradle.properties'
      );

      let gradleProps = '';
      if (fs.existsSync(gradlePropsPath)) {
        gradleProps = fs.readFileSync(gradlePropsPath, 'utf-8');
      }

      // Add or update GitHub credentials
      if (!gradleProps.includes('GITHUB_USERNAME=')) {
        gradleProps += `\n# GitHub Packages credentials for @justwatch/snowplow-android-tracker\nGITHUB_USERNAME=${username}\n`;
      }
      if (!gradleProps.includes('GITHUB_TOKEN=')) {
        gradleProps += `GITHUB_TOKEN=${token}\n`;
      }

      fs.writeFileSync(gradlePropsPath, gradleProps);
      return modConfig;
    },
  ]);

  // Step 2: Add GitHub Packages Maven repository to build.gradle
  config = withProjectBuildGradle(config, (modConfig) => {
    let buildGradle = modConfig.modResults.contents;

    // Check if GitHub Packages repo is already added
    if (buildGradle.includes('maven.pkg.github.com/justwatch/snowplow-android-tracker')) {
      return modConfig;
    }

    // Add GitHub Packages Maven repository to allprojects.repositories
    const githubPackagesRepo = `
        // JustWatch Snowplow Android tracker fork with pageUrl/referrer support
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/justwatch/snowplow-android-tracker")
            credentials {
                username = findProperty("GITHUB_USERNAME") ?: ""
                password = findProperty("GITHUB_TOKEN") ?: ""
            }
        }`;

    // Find allprojects { repositories { and add after it
    const allProjectsRepoPattern = /(allprojects\s*\{\s*repositories\s*\{)/;
    if (allProjectsRepoPattern.test(buildGradle)) {
      buildGradle = buildGradle.replace(allProjectsRepoPattern, `$1${githubPackagesRepo}`);
    } else {
      // Fallback: add to the end of the file as allprojects block
      buildGradle += `
allprojects {
    repositories {${githubPackagesRepo}
    }
}
`;
    }

    modConfig.modResults.contents = buildGradle;
    return modConfig;
  });

  return config;
};
