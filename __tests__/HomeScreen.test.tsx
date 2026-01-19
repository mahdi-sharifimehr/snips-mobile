import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { useHomeData } from '../src/hooks/useHomeData';

jest.mock('../src/hooks/useHomeData');

const mockedUseHomeData = useHomeData as jest.Mock;

describe('HomeScreen', () => {
  it('renders sections and titles from the API', () => {
    mockedUseHomeData.mockReturnValue({
      loading: false,
      error: null,
      data: {
        data: {
          components: [
            {
              id: 'section-1',
              componentType: 'LARGE_COVERS',
              sectionTitle: 'Top 10',
              titles: [
                {
                  id: 'title-1',
                  nameEn: 'Test Show',
                  genres: ['Drama'],
                  tags: ['Hot'],
                  posterUrl: 'https://example.com/cover.jpg',
                  snipsCount: 12,
                },
              ],
            },
          ],
        },
      },
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText('Top 10')).toBeTruthy();
    expect(getByText('Test Show')).toBeTruthy();
    expect(getByText('Drama')).toBeTruthy();
  });

  it('renders error state', () => {
    mockedUseHomeData.mockReturnValue({
      loading: false,
      error: 'Network error',
      data: null,
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Network error')).toBeTruthy();
  });
});
