import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { HomeComponent, HomeTitle } from '../services/types';
import { theme } from '../theme';
import TitleCard from './TitleCard';

type SectionRowProps = {
  section: HomeComponent;
};

export default function SectionRow({ section }: SectionRowProps) {
  const size = section.componentType === 'LARGE_COVERS' ? 'large' : 'small';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{section.sectionTitle}</Text>
      </View>
      <FlatList<HomeTitle>
        horizontal
        showsHorizontalScrollIndicator={false}
        data={section.titles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <TitleCard item={item} size={size} index={index} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
});
