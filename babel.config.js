module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@config': './src/config',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@models': './src/models',
          '@utils': './src/utils',
          '@context': './src/context',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
