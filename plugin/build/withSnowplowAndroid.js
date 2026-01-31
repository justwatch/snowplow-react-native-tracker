"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSnowplowAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
/**
 * Config plugin to add GitHub Packages Maven repository for the JustWatch
 * Snowplow Android tracker fork with pageUrl/referrer support.
 *
 * The app needs access to maven.pkg.github.com to resolve the dependency.
 * Credentials are read from GITHUB_USERNAME and GITHUB_TOKEN environment variables.
 */
const withSnowplowAndroid = (config) => {
    return (0, config_plugins_1.withProjectBuildGradle)(config, (modConfig) => {
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
                username = System.getenv("GITHUB_USERNAME") ?: "token"
                password = System.getenv("GITHUB_TOKEN") ?: ""
            }
        }`;
        // Find allprojects { repositories { and add after it
        const allProjectsRepoPattern = /(allprojects\s*\{\s*repositories\s*\{)/;
        if (allProjectsRepoPattern.test(buildGradle)) {
            buildGradle = buildGradle.replace(allProjectsRepoPattern, `$1${githubPackagesRepo}`);
        }
        else {
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
};
exports.withSnowplowAndroid = withSnowplowAndroid;
