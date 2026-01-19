import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import type { FeedTitle } from '../services/types';
import FeedCardView from '../components/feed/FeedCardView';

type FeedCardContainerProps = {
  item: FeedTitle;
  height: number;
  isActive: boolean;
  isScreenFocused: boolean;
  bottomOffset: number;
};

export default function FeedCardContainer({
  item,
  height,
  isActive,
  isScreenFocused,
  bottomOffset,
}: FeedCardContainerProps) {
  const videoRef = useRef<Video | null>(null);
  const toggleLock = useRef(false);
  const [userPaused, setUserPaused] = useState(false);

  const shouldPlay = useMemo(
    () => isActive && isScreenFocused && !userPaused,
    [isActive, isScreenFocused, userPaused],
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
    <FeedCardView
      height={height}
      bottomOffset={bottomOffset}
      title={item.name_en}
      description={item.captions_en}
      showPlayOverlay={isActive && userPaused}
      onTogglePlayback={handleTogglePlayback}
      video={
        <Video
          ref={videoRef}
          source={{ uri: item.video_playback_url }}
          posterSource={{ uri: item.poster_url }}
          posterStyle={{ resizeMode: 'cover' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode={ResizeMode.COVER}
          shouldPlay={shouldPlay}
          isLooping
          isMuted={false}
        />
      }
    />
  );
}
