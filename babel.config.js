module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          App: './App.tsx',
          api: './src/API/',
          types: './src/@types/',
          assets: './src/assets/',
          components: './src/components/',
          AppLayer: './src/components/AppLayer/',
          AuthLayer: './src/components/AuthLayer/',
          common: './src/components/common/',
          navigation: './src/navigation/',
          appRedux: './src/redux/',
          scheme: './src/scheme/',
          utils: './src/utils/',
        },
      },
    ],
  ],
};
