module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['tests/**'],
      env: {
        jest: true,
      },
    },
  ],
};
