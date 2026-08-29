import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../utils/theme';
import { CATEGORIES } from '../data/shortcuts';

export default function ShortcutCard({ shortcut, showCategory = false, platform = 'windows' }) {
  const [expanded, setExpanded] = useState(false);

  const category = CATEGORIES.find(c => c.id === shortcut.category);
  const keyCombo = platform === 'mac' ? shortcut.mac : shortcut.windows;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        {showCategory && category && (
          <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
        )}
        <View style={styles.content}>
          <Text style={styles.description}>{shortcut.description}</Text>
          <View style={styles.keyRow}>
            {keyCombo.split('+').map((key, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Text style={styles.plus}>+</Text>}
                <View style={styles.keyBadge}>
                  <Text style={styles.keyText}>{key.trim()}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textLight}
        />
      </View>

      {expanded && shortcut.tip && (
        <View style={styles.tipBox}>
          <MaterialCommunityIcons name="lightbulb-outline" size={14} color={colors.warning} />
          <Text style={styles.tipText}>{shortcut.tip}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  content: {
    flex: 1,
  },
  description: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  keyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  keyBadge: {
    backgroundColor: colors.borderLight,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 2,
  },
  keyText: {
    ...typography.mono,
    color: colors.text,
    fontSize: 12,
  },
  plus: {
    ...typography.label,
    color: colors.textLight,
    fontSize: 11,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.sm,
    gap: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  tipText: {
    ...typography.bodySmall,
    color: '#92400E',
    flex: 1,
  },
});
