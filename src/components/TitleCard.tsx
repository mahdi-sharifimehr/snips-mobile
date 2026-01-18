import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import type { HomeTitle } from '../services/types';

type TitleCardProps = {
  item: HomeTitle;
  size: 'large' | 'small';
  index?: number;
};

export default function TitleCard({ item, size, index }: TitleCardProps) {
  const imageSource = item.posterUrl || item.thumbnailUrl;
  const showIndex = typeof index === 'number' && size === 'large';

  return (
    <View style={[styles.card, size === 'large' ? styles.cardLarge : styles.cardSmall]}>
      {imageSource ? (
        <ImageBackground source={{ uri: imageSource }} style={styles.image} imageStyle={styles.imageRadius}>
          <View style={styles.overlay} />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.65)']}
            style={styles.gradient}
          />
          {showIndex ? (
            <Text style={styles.rank}>{index + 1}</Text>
          ) : null}
          {item.tags?.[0] ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>
                {item.tags[0]}
              </Text>
            </View>
          ) : null}
          <View style={styles.meta}>
            <Text style={styles.title} numberOfLines={1}>
              {item.nameEn}
            </Text>
            {item.genres?.[0] ? <Text style={styles.genre}>{item.genres[0]}</Text> : null}
          </View>
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
    width: 170,
    height: 250,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.overlay,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.radius.md,
  },
  meta: {
    padding: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
  },
  genre: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    fontFamily: theme.fonts.regular,
  },
  rank: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: theme.colors.text,
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 45, 85, 0.85)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: 110,
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 10,
    textTransform: 'uppercase',
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
