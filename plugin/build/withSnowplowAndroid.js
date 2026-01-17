"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSnowplowAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withSnowplowAndroid = (config) => {
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        // INTERNET permission is already added by Expo by default
        // No additional Android configuration needed for Snowplow tracker
        return config;
    });
};
exports.withSnowplowAndroid = withSnowplowAndroid;
