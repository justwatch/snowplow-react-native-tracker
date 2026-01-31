import { ConfigPlugin } from '@expo/config-plugins';
/**
 * Config plugin to add GitHub Packages Maven repository for the JustWatch
 * Snowplow Android tracker fork with pageUrl/referrer support.
 *
 * The app needs access to maven.pkg.github.com to resolve the dependency.
 * Credentials are read from GITHUB_USERNAME and GITHUB_TOKEN environment variables.
 */
export declare const withSnowplowAndroid: ConfigPlugin;
