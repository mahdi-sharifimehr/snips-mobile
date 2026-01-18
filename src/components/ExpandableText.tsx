import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

type ExpandableTextProps = {
  text: string;
  maxLength?: number;
};

export default function ExpandableText({ text, maxLength = 140 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxLength;

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
        <Pressable onPress={() => setExpanded((prev) => !prev)}>
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
  },
  action: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
});
