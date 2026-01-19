import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import type { HomeTitle } from '../services/types';

type TitleCardProps = {
  item: HomeTitle;
  size: 'large' | 'small';
  index?: number;
  isTopTen?: boolean;
  showMetaInside?: boolean;
  cardSize?: { width: number; height: number };
};

export default function TitleCard({
  item,
  size,
  index,
  isTopTen,
  showMetaInside = true,
  cardSize,
}: TitleCardProps) {
  const imageSource = item.posterUrl || item.thumbnailUrl;
  const showIndex = typeof index === 'number' && size === 'large';
  const tag = item.tags?.[0];
  const tagColor = tag ? getTagColor(tag) : theme.colors.surface;
  const isLarge = size === 'large';
  const showTag = Boolean(isTopTen && tag);
  const showSnips = !isTopTen && typeof item.snipsCount === 'number';

  return (
    <View
      style={[
        styles.card,
        size === 'large' ? styles.cardLarge : styles.cardSmall,
        cardSize ? { width: cardSize.width, height: cardSize.height } : null,
      ]}
    >
      {imageSource ? (
        <ImageBackground
          source={{ uri: imageSource }}
          style={styles.image}
          imageStyle={styles.imageRadius}
        >
          <LinearGradient
            colors={
              isTopTen
                ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']
                : ['rgba(0,0,0,0)', 'rgba(0,0,0,0.55)']
            }
            locations={[0.55, 1]}
            style={styles.bottomFade}
          />
          {isTopTen ? (
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
              locations={[0, 1]}
              style={styles.textScrim}
            />
          ) : null}
          {showIndex ? <Text style={styles.rank}>{index + 1}</Text> : null}
          {showTag ? (
            <View style={[styles.badge, { backgroundColor: tagColor }]}>
              <Text style={styles.badgeText} numberOfLines={1}>
                {tag}
              </Text>
            </View>
          ) : null}
          {showSnips ? (
            <View style={styles.snipsBadge}>
              <Ionicons name="eye" size={12} color={theme.colors.text} />
              <Text style={styles.snipsText}>{item.snipsCount}</Text>
            </View>
          ) : null}
          {showMetaInside ? (
            <View style={styles.meta}>
              {item.genres?.length ? (
                <Text
                  style={[styles.genre, isTopTen && styles.genreTopTen]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.genres.join(', ')}
                </Text>
              ) : null}
              <Text
                style={[styles.title, isLarge && styles.titleLarge, isTopTen && styles.titleTopTen]}
                numberOfLines={1}
              >
                {item.nameEn}
              </Text>
            </View>
          ) : null}
        </ImageBackground>
      ) : (
        <View style={[styles.image, styles.imageRadius, styles.fallback]}>
          <Text style={styles.fallbackText} numberOfLines={2}>
            {item.nameEn}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardLarge: {
    width: 240,
    height: 300,
  },
  cardSmall: {
    width: 130,
    height: 190,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: theme.radius.md,
  },
  bottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '45%',
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
  },
  textScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
  },
  meta: {
    padding: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
  },
  titleLarge: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  titleTopTen: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  genre: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
    fontFamily: theme.fonts.regular,
  },
  genreTopTen: {
    color: '#E3E3E3',
    fontSize: 12,
  },
  rank: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    color: 'rgba(255,255,255,0.40)',
    fontSize: 130,
    fontFamily: theme.fonts.bold,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: 110,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: theme.fonts.semibold,
  },
  snipsBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  snipsText: {
    color: theme.colors.text,
    fontSize: 10,
    fontFamily: theme.fonts.semibold,
  },
  fallback: {
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  fallbackText: {
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    textAlign: 'center',
  },
});

function getTagColor(tag: string) {
  const normalized = tag.trim().toLowerCase();
  const palette = ['#9C27B0', '#FF6B00', '#00B0FF', '#00C853', '#FFB300', '#26A69A'];
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) % palette.length;
  }

  return palette[hash] ?? '#4B4B4B';
}
