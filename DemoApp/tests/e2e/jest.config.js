/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '../..',
  testMatch: ['<rootDir>/tests/e2e/**/*.e2e.detox.js'],
  testTimeout: 300000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
