"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withSnowplowAndroid_1 = require("./withSnowplowAndroid");
const withSnowplowIos_1 = require("./withSnowplowIos");
const pkg = require('../../package.json');
const withSnowplowTracker = (config) => {
    config = (0, withSnowplowAndroid_1.withSnowplowAndroid)(config);
    config = (0, withSnowplowIos_1.withSnowplowIos)(config);
    return config;
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withSnowplowTracker, pkg.name, pkg.version);
