import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#1B0B12', theme.colors.background]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
        style={StyleSheet.absoluteFill}
      />
      <FlatList<HomeComponent>
        data={sections}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => <SectionRow section={item} index={index} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        windowSize={4}
        initialNumToRender={3}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Snips</Text>
            <Text style={styles.headerSubtitle}>Find your next obsession</Text>
          </View>
        }
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
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontFamily: theme.fonts.bold,
  },
  headerSubtitle: {
    color: theme.colors.textMuted,
    marginTop: 4,
    fontFamily: theme.fonts.regular,
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
