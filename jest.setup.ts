import React from 'react';
import '@testing-library/jest-native/extend-expect';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }) => React.createElement(Text, null, name),
  };
});

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: View };
});

jest.mock('expo-av', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Video = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      setPositionAsync: jest.fn().mockResolvedValue(undefined),
      pauseAsync: jest.fn().mockResolvedValue(undefined),
      playAsync: jest.fn().mockResolvedValue(undefined),
      setStatusAsync: jest.fn().mockResolvedValue(undefined),
      getStatusAsync: jest.fn().mockResolvedValue({ isLoaded: true, isPlaying: false }),
    }));
    return React.createElement(View, props);
  });

  return {
    Video,
    ResizeMode: { COVER: 'cover' },
  };
});

jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});
