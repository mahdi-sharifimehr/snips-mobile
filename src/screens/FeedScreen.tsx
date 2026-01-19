import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import FeedCardContainer from '../containers/FeedCardContainer';
import { useFeedData } from '../hooks/useFeedData';
import type { FeedTitle } from '../services/types';
import { theme } from '../theme';

export default function FeedScreen() {
  const { data, loading, error } = useFeedData();
  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();
  const feed = data?.feedTitles ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 80,
    }),
    [],
  );
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const next = viewableItems.find((item) => item.isViewable);
      if (next?.index != null) {
        setActiveIndex(next.index);
      }
    },
  );
  const itemHeight = height - tabBarHeight;
  const clampIndex = useCallback(
    (index: number) => Math.max(0, Math.min(index, Math.max(feed.length - 1, 0))),
    [feed.length],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: FeedTitle; index: number }) => (
      <FeedCardContainer
        item={item}
        height={itemHeight}
        isActive={index === activeIndex}
        isScreenFocused={isFocused}
        bottomOffset={tabBarHeight}
      />
    ),
    [activeIndex, isFocused, itemHeight, tabBarHeight],
  );
  const getItemLayout = useCallback(
    (_: ArrayLike<FeedTitle> | null | undefined, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
  );
  const handleMomentumEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const nextIndex = Math.round(offsetY / itemHeight);
      setActiveIndex(clampIndex(nextIndex));
    },
    [clampIndex, itemHeight],
  );
  const handleScrollBeginDrag = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setActiveIndex(-1);
    }
  }, [isFocused]);

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
      maxToRenderPerBatch={3}
      removeClippedSubviews
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
      onMomentumScrollEnd={handleMomentumEnd}
      onScrollBeginDrag={handleScrollBeginDrag}
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
