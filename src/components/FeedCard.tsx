import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeMode, Video } from 'expo-av';
import { theme } from '../theme';
import type { FeedTitle } from '../services/types';
import ExpandableText from './ExpandableText';

type FeedCardProps = {
  item: FeedTitle;
  height: number;
  isActive: boolean;
  isScreenFocused: boolean;
  bottomOffset: number;
};

export default function FeedCard({
  item,
  height,
  isActive,
  isScreenFocused,
  bottomOffset,
}: FeedCardProps) {
  const videoRef = useRef<Video | null>(null);
  const toggleLock = useRef(false);
  const [userPaused, setUserPaused] = useState(false);
  const shouldPlay = useMemo(
    () => isActive && isScreenFocused && !userPaused,
    [isActive, isScreenFocused, userPaused]
  );

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (isActive) {
      setUserPaused(false);
      videoRef.current.setPositionAsync(0).catch(() => undefined);
    } else {
      videoRef.current.pauseAsync().catch(() => undefined);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isScreenFocused) {
      videoRef.current?.pauseAsync().catch(() => undefined);
    }
  }, [isScreenFocused]);

  useEffect(() => {
    if (!videoRef.current || !isActive || !isScreenFocused) {
      return;
    }
    if (userPaused) {
      videoRef.current.pauseAsync().catch(() => undefined);
      videoRef.current.setStatusAsync({ shouldPlay: false }).catch(() => undefined);
    } else {
      videoRef.current.playAsync().catch(() => undefined);
    }
  }, [isActive, isScreenFocused, userPaused]);

  const handleTogglePlayback = useCallback(async () => {
    if (!isActive || !videoRef.current) {
      return;
    }
    if (toggleLock.current) {
      return;
    }
    toggleLock.current = true;
    try {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          setUserPaused(true);
          await videoRef.current.pauseAsync();
          await videoRef.current.setStatusAsync({ shouldPlay: false });
        } else {
          setUserPaused(false);
          await videoRef.current.playAsync();
        }
      }
    } catch {
      // Swallow toggle race errors; state will reconcile on next tick.
    } finally {
      toggleLock.current = false;
    }
  }, [isActive]);

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{ uri: item.video_playback_url }}
          posterSource={{ uri: item.poster_url }}
          posterStyle={styles.videoPoster}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={shouldPlay}
          isLooping
          isMuted={false}
        />
        {isActive && userPaused ? (
          <View style={styles.playOverlay}>
            <Ionicons name="play" size={48} color={theme.colors.text} />
          </View>
        ) : null}
      </View>
      <Pressable style={styles.overlay} onPress={handleTogglePlayback}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
          style={styles.scrim}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name_en}</Text>
          <ExpandableText text={item.captions_en} />
        </View>
        <Pressable
          style={[
            styles.ctaButton,
            {
              bottom: theme.spacing.lg,
              left: theme.spacing.lg,
              right: theme.spacing.lg + 56 + theme.spacing.md,
            },
          ]}
          onPress={(event) => {
            event.stopPropagation();
          }}
        >
          <Ionicons name="play" color={theme.colors.text} size={18} />
          <Text style={styles.ctaText}>Watch Now</Text>
        </Pressable>
        <View style={[styles.actions, { bottom: 0 }]}>
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            <Ionicons name="bookmark" size={30} color={theme.colors.text} />
            <Text style={styles.actionText}>24 k</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            <Ionicons name="list" size={30} color={theme.colors.text} />
            <Text style={styles.actionText}>Episodes</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            <Ionicons name="share-social" size={30} color={theme.colors.text} />
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.text} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  videoWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoPoster: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  playOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingRight: theme.spacing.lg + 84,
    paddingBottom: theme.spacing.lg + 56,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.sm,
  },
  ctaButton: {
    position: 'absolute',
    backgroundColor: theme.colors.accent,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.semibold,
    marginLeft: 8,
  },
  actions: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.xl,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  actionText: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    marginTop: 4,
    textAlign: 'center',
  },
});
