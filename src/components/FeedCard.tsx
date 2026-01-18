import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
          style={styles.scrim}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name_en}</Text>
          <ExpandableText text={item.captions_en} />
          <View style={styles.ctaRow}>
            <Pressable style={styles.ctaButton}>
              <Ionicons name="play" color={theme.colors.text} size={18} />
              <Text style={styles.ctaText}>Watch Now</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="heart" size={18} color={theme.colors.text} />
            <Text style={styles.actionText}>Like</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="bookmark" size={18} color={theme.colors.text} />
            <Text style={styles.actionText}>Save</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="share-social" size={18} color={theme.colors.text} />
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
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.sm,
  },
  ctaRow: {
    marginTop: theme.spacing.md,
  },
  ctaButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.semibold,
    marginLeft: 8,
  },
  actions: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.xl,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  actionText: {
    color: theme.colors.text,
    fontSize: 10,
    fontFamily: theme.fonts.medium,
    marginTop: 4,
  },
});
