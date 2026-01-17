import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins';

export const withSnowplowIos: ConfigPlugin = (config) => {
  return withInfoPlist(config, (config) => {
    // No additional iOS configuration needed for Snowplow tracker
    return config;
  });
};
