/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'tests/e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 300000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/DemoApp.app',
      build: 'xcodebuild -workspace ios/DemoApp.xcworkspace -scheme DemoApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/DemoApp.app',
      build: 'xcodebuild -workspace ios/DemoApp.xcworkspace -scheme DemoApp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_API_34',
      },
    },
  },
  configurations: {
    'ios': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'android': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};
