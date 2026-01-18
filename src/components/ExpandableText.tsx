import React, { useEffect, useMemo, useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';
import { theme } from '../theme';

type ExpandableTextProps = {
  text: string;
  maxLength?: number;
};

export default function ExpandableText({ text, maxLength = 140 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxLength;

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const displayText = useMemo(() => {
    if (!isLong || expanded) {
      return text;
    }
    return `${text.slice(0, maxLength).trim()}...`;
  }, [text, expanded, isLong, maxLength]);

  if (!text) {
    return null;
  }

  return (
    <View>
      <Text style={styles.text}>{displayText}</Text>
      {isLong ? (
        <Pressable
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setExpanded((prev) => !prev);
          }}
        >
          <Text style={styles.action}>{expanded ? 'Less' : 'More'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: theme.fonts.regular,
  },
  action: {
    color: theme.colors.text,
    fontSize: 13,
    fontFamily: theme.fonts.semibold,
    marginTop: 6,
  },
});
