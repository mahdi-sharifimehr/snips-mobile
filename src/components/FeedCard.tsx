import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { FeedTitle } from '../services/types';
import ExpandableText from './ExpandableText';

type FeedCardProps = {
  item: FeedTitle;
  height: number;
};

export default function FeedCard({ item, height }: FeedCardProps) {
  return (
    <View style={[styles.container, { height }]}>
      <ImageBackground source={{ uri: item.poster_url }} style={styles.image}>
        <View style={styles.scrim} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name_en}</Text>
          <ExpandableText text={item.captions_en} />
          <View style={styles.ctaRow}>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Watch Now</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Like</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Save</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  ctaRow: {
    marginTop: theme.spacing.md,
  },
  ctaButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  actions: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: theme.colors.text,
    fontSize: 18,
  },
});
