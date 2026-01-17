"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSnowplowIos = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const withSnowplowIos = (config) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'ios',
        async (config) => {
            const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
            if (fs.existsSync(podfilePath)) {
                let podfileContent = fs.readFileSync(podfilePath, 'utf-8');
                // Check if the override is already added
                if (!podfileContent.includes('micheleb/snowplow-objc-tracker')) {
                    // Add the forked SnowplowTracker pod override before the first target declaration
                    const forkedPodLine = `
# Use forked SnowplowTracker with pageUrl/referrer support
pod 'SnowplowTracker', :git => 'https://github.com/micheleb/snowplow-objc-tracker.git', :branch => 'master'

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
exports.withSnowplowIos = withSnowplowIos;
