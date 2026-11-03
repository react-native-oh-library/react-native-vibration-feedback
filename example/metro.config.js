const {getDefaultConfig} = require('metro-config');
const {createHarmonyMetroConfig} = require('react-native-harmony/metro.config');

const defaultConfig = getDefaultConfig(__dirname);
const harmonyConfig = createHarmonyMetroConfig({
  reactNativeHarmonyPackageName: 'react-native-harmony',
});

module.exports = {
  ...defaultConfig,
  ...harmonyConfig,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
