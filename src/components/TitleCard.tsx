import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
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
          {showIndex ? (
            <Text style={styles.rank}>{index + 1}</Text>
          ) : null}
          <View style={styles.meta}>
            {item.tags?.[0] ? <Text style={styles.tag}>{item.tags[0]}</Text> : null}
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
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  meta: {
    padding: theme.spacing.sm,
  },
  tag: {
    color: theme.colors.textMuted,
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  genre: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  rank: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
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
    fontWeight: '600',
    textAlign: 'center',
  },
});
