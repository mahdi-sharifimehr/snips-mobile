import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import FeedCard from '../components/FeedCard';
import { useFeedData } from '../hooks/useFeedData';
import type { FeedTitle } from '../services/types';
import { theme } from '../theme';

export default function FeedScreen() {
  const { data, loading, error } = useFeedData();
  const { height } = useWindowDimensions();
  const feed = data?.feedTitles ?? [];

  const renderItem = useCallback(
    ({ item }: { item: FeedTitle }) => <FeedCard item={item} height={height} />,
    [height]
  );
  const getItemLayout = useCallback(
    (_: ArrayLike<FeedTitle> | null | undefined, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    [height]
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList<FeedTitle>
      data={feed}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
      style={styles.container}
      getItemLayout={getItemLayout}
      windowSize={3}
      initialNumToRender={2}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  errorTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.sm,
  },
  errorMessage: {
    color: theme.colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
  },
});
