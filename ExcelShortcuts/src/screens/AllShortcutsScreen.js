import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHORTCUTS } from '../data/shortcuts';
import ShortcutCard from '../components/ShortcutCard';
import SearchBar from '../components/SearchBar';
import PlatformToggle from '../components/PlatformToggle';
import { colors, spacing, radius, typography } from '../utils/theme';

export default function AllShortcutsScreen() {
  const [query, setQuery] = useState('');
  const [os, setOs] = useState('windows');

  const filtered = useMemo(() => {
    if (!query.trim()) return SHORTCUTS;
    const q = query.toLowerCase();
    return SHORTCUTS.filter(s =>
      s.description.toLowerCase().includes(q) ||
      s.windows.toLowerCase().includes(q) ||
      s.mac.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>All Shortcuts</Text>
        <PlatformToggle platform={os} onChange={setOs} />
      </View>
      <View style={styles.searchWrap}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search all shortcuts..." />
      </View>
      <Text style={styles.count}>{filtered.length} shortcut{filtered.length !== 1 ? 's' : ''}</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ShortcutCard shortcut={item} platform={os} showCategory />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="magnify-close" size={40} color={colors.textLight} />
            <Text style={styles.emptyText}>No shortcuts found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  heading: { ...typography.h2, color: colors.text },
  searchWrap: { paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    textTransform: 'none',
  },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: { ...typography.h3, color: colors.textSecondary },
});
