import React from 'react';
import { render } from '@testing-library/react-native';
import FeedScreen from '../src/screens/FeedScreen';
import { useFeedData } from '../src/hooks/useFeedData';

jest.mock('../src/hooks/useFeedData');
jest.mock('@react-navigation/bottom-tabs', () => ({
  useBottomTabBarHeight: () => 48,
}));
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
}));

const mockedUseFeedData = useFeedData as jest.Mock;

describe('FeedScreen', () => {
  it('renders feed item content', () => {
    mockedUseFeedData.mockReturnValue({
      loading: false,
      error: null,
      data: {
        feedTitles: [
          {
            id: 'feed-1',
            name_en: 'Narcos',
            captions_en: 'A story about Pablo Escobar.',
            poster_url: 'https://example.com/poster.jpg',
            video_playback_url: 'https://example.com/stream.m3u8',
          },
        ],
        total: 1,
        currentPage: 1,
        totalPages: 1,
        nextPage: null,
      },
    });

    const { getByText } = render(<FeedScreen />);

    expect(getByText('Narcos')).toBeTruthy();
    expect(getByText('Watch Now')).toBeTruthy();
  });

  it('renders error state', () => {
    mockedUseFeedData.mockReturnValue({
      loading: false,
      error: 'Failed to load feed data',
      data: null,
    });

    const { getByText } = render(<FeedScreen />);

    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Failed to load feed data')).toBeTruthy();
  });
});
