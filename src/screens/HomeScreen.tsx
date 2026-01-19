import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHomeData } from '../hooks/useHomeData';
import type { HomeComponent } from '../services/types';
import { theme } from '../theme';
import SectionRow from '../components/SectionRow';

export default function HomeScreen() {
  const { data, loading, error } = useHomeData();
  const sections = useMemo(() => data?.data.components ?? [], [data]);
  const insets = useSafeAreaInsets();
  const renderItem = useCallback(
    ({ item, index }: { item: HomeComponent; index: number }) => (
      <SectionRow section={item} index={index} />
    ),
    [],
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
    <View style={styles.container}>
      <FlatList<HomeComponent>
        data={sections}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + theme.spacing.md }]}
        showsVerticalScrollIndicator={false}
        windowSize={4}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
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
