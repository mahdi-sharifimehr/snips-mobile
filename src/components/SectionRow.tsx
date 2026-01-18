import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import type { HomeComponent, HomeTitle } from '../services/types';
import { theme } from '../theme';
import TitleCard from './TitleCard';

type SectionRowProps = {
  section: HomeComponent;
  index: number;
};

export default function SectionRow({ section, index }: SectionRowProps) {
  const size = section.componentType === 'LARGE_COVERS' ? 'large' : 'small';
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: index * 80,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{section.sectionTitle}</Text>
        <Text style={styles.link}>See all</Text>
      </View>
      <FlatList<HomeTitle>
        horizontal
        showsHorizontalScrollIndicator={false}
        data={section.titles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <TitleCard item={item} size={size} index={index} />}
        contentContainerStyle={styles.listContent}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontFamily: theme.fonts.semibold,
  },
  link: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
});
