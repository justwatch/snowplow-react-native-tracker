import { ConfigPlugin, withDangerousMod } from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

export const withSnowplowIos: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');

      if (fs.existsSync(podfilePath)) {
        let podfileContent = fs.readFileSync(podfilePath, 'utf-8');

        // Check if the override is already added
        if (!podfileContent.includes('justwatch/snowplow-objc-tracker')) {
          // Add the forked SnowplowTracker pod override before the first target declaration
          const forkedPodLine = `
# Use forked SnowplowTracker with pageUrl/referrer support
pod 'SnowplowTracker', :git => 'https://github.com/justwatch/snowplow-objc-tracker.git', :branch => 'master'

`;
          // Insert before the first 'target' declaration
          const targetMatch = podfileContent.match(/^target\s+['"][^'"]+['"]\s+do/m);
          if (targetMatch && targetMatch.index !== undefined) {
            podfileContent =
              podfileContent.slice(0, targetMatch.index) +
              forkedPodLine +
              podfileContent.slice(targetMatch.index);
          }

          fs.writeFileSync(podfilePath, podfileContent);
        }
      }

      return config;
    },
  ]);
};
