module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  watchman: false,
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|expo-av|expo-font|expo-linear-gradient|@expo-google-fonts/space-grotesk|react-native-safe-area-context|react-native-screens)',
  ],
};
