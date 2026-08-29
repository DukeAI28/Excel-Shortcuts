import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, typography } from '../utils/theme';

export default function PlatformToggle({ platform, onChange }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, platform === 'windows' && styles.active]}
        onPress={() => onChange('windows')}
      >
        <Text style={[styles.label, platform === 'windows' && styles.activeLabel]}>
          Windows
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, platform === 'mac' && styles.active]}
        onPress={() => onChange('mac')}
      >
        <Text style={[styles.label, platform === 'mac' && styles.activeLabel]}>
          Mac
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: radius.full,
    padding: 3,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: radius.full,
  },
  active: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: 13,
  },
  activeLabel: {
    color: colors.text,
  },
});
