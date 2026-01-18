import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useHomeData } from '../hooks/useHomeData';
import type { HomeComponent } from '../services/types';
import { theme } from '../theme';
import SectionRow from '../components/SectionRow';

export default function HomeScreen() {
  const { data, loading, error } = useHomeData();
  const sections = data?.data.components ?? [];

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
    <FlatList<HomeComponent>
      style={styles.container}
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SectionRow section={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingTop: theme.spacing.lg,
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
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  errorMessage: {
    color: theme.colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
  },
});
