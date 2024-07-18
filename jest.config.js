module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@?react-native.*|@?react-navigation.*)/)',
  ],
  setupFilesAfterEnv: ['./jest-setup-after-env.js'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
};
