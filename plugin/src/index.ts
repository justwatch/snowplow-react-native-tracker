import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { withSnowplowAndroid } from './withSnowplowAndroid';
import { withSnowplowIos } from './withSnowplowIos';

const pkg = require('../../package.json');

const withSnowplowTracker: ConfigPlugin = (config) => {
  config = withSnowplowAndroid(config);
  config = withSnowplowIos(config);
  return config;
};

export default createRunOncePlugin(withSnowplowTracker, pkg.name, pkg.version);
