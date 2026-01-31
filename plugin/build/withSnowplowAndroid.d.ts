import { ConfigPlugin } from '@expo/config-plugins';
/**
 * Config plugin to add GitHub Packages Maven repository for the JustWatch
 * Snowplow Android tracker fork with pageUrl/referrer support.
 *
 * Credentials are read from ~/.npmrc:
 *   //npm.pkg.github.com/:_authToken=TOKEN
 *   //npm.pkg.github.com/:username=USERNAME
 */
export declare const withSnowplowAndroid: ConfigPlugin;
