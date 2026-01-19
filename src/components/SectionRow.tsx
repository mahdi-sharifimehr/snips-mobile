import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { HomeComponent, HomeTitle } from '../services/types';
import { theme } from '../theme';
import TitleCard from './TitleCard';

type SectionRowProps = {
  section: HomeComponent;
  index: number;
};

export default function SectionRow({ section, index }: SectionRowProps) {
  const size = section.componentType === 'LARGE_COVERS' ? 'large' : 'small';
  const isTopTen = section.sectionTitle === 'Top 10';
  const isRegular = section.componentType === 'REGULAR_COVERS';
  const isMoreTitles = section.componentType === 'MORE_TITLES';
  const showLink = !isTopTen;
  const { width } = useWindowDimensions();
  const moreItemWidth = (width - theme.spacing.lg * 2 - theme.spacing.md) / 2;
  const moreGridWidth = moreItemWidth * 2 + theme.spacing.md;
  const moreItemHeight = Math.round(moreItemWidth * 1.35);
  const moreTitlesData = isMoreTitles
    ? [...section.titles, { id: 'explore-more' } as HomeTitle]
    : section.titles;
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
        {showLink ? (
          isMoreTitles ? (
            <Text style={styles.moreTitles}>New every week!</Text>
          ) : (
            <Ionicons name="chevron-forward" size={22} color={theme.colors.text} />
          )
        ) : null}
      </View>
      <FlatList<HomeTitle>
        horizontal={!isMoreTitles}
        showsHorizontalScrollIndicator={false}
        data={moreTitlesData}
        keyExtractor={(item, idx) => (item.id ? item.id : `explore-${idx}`)}
        renderItem={({ item, index }) => {
          if (isMoreTitles && item.id === 'explore-more') {
            return (
            <View style={[styles.moreItem, { width: moreItemWidth }]}>
              <View style={[styles.exploreCard, { height: moreItemHeight }]}>
                <Ionicons name="play-circle" size={28} color={theme.colors.textMuted} />
                <Text style={styles.exploreText}>Explore more</Text>
              </View>
            </View>
          );
        }

        return (
            <View
              style={[
                isMoreTitles ? styles.moreItem : isRegular ? styles.regularItem : undefined,
                isMoreTitles ? { width: moreItemWidth } : null,
              ]}
            >
              <TitleCard
                item={item}
                size={size}
                index={index}
                isTopTen={isTopTen}
                showMetaInside={!isRegular && !isMoreTitles}
                cardSize={isMoreTitles ? { width: moreItemWidth, height: moreItemHeight } : undefined}
              />
              {isRegular ? (
                <View style={styles.regularMeta}>
                  {item.genres?.length ? (
                    <Text style={styles.regularGenre} numberOfLines={1} ellipsizeMode="tail">
                      {item.genres.join(', ')}
                    </Text>
                  ) : null}
                  <Text style={styles.regularTitle} numberOfLines={1}>
                    {item.nameEn}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        }}
        contentContainerStyle={isMoreTitles ? styles.moreListContent : styles.listContent}
        numColumns={isMoreTitles ? 2 : 1}
        columnWrapperStyle={
          isMoreTitles
            ? [styles.moreColumn, { width: moreGridWidth, alignSelf: 'center', columnGap: theme.spacing.md }]
            : undefined
        }
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontFamily: theme.fonts.bold,
  },
  link: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  moreListContent: {
    paddingBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  moreColumn: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  moreItem: {
    marginBottom: theme.spacing.md,
  },
  moreTitles: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontFamily: theme.fonts.medium,
  },
  regularItem: {
    marginRight: theme.spacing.md,
    width: 130,
  },
  regularMeta: {
    marginTop: 8,
  },
  regularGenre: {
    color: '#E3E3E3',
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },
  regularTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    marginTop: 2,
  },
  exploreCard: {
    height: 250,
    borderRadius: theme.radius.md,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exploreText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
  },
});
