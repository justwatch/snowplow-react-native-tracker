import { ConfigPlugin, withAndroidManifest } from '@expo/config-plugins';

export const withSnowplowAndroid: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    // INTERNET permission is already added by Expo by default
    // No additional Android configuration needed for Snowplow tracker
    return config;
  });
};
