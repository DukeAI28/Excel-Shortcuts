import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES, SHORTCUTS } from '../data/shortcuts';
import ShortcutCard from '../components/ShortcutCard';
import SearchBar from '../components/SearchBar';
import PlatformToggle from '../components/PlatformToggle';
import { useFavorites } from '../context/FavoritesContext';
import { colors, spacing, radius, typography } from '../utils/theme';

const MOST_USED_IDS = [
  'edt-3',  // Copy
  'edt-5',  // Paste
  'edt-1',  // Undo
  'wb-1',   // Save
  'fmt-1',  // Bold
  'frm-1',  // AutoSum
  'frm-2',  // Edit cell
  'frm-3',  // Toggle $ reference
  'edt-7',  // Fill Down
  'edt-9',  // Find & Replace
  'fmt-7',  // AutoFilter
  'dat-1',  // Create Table
];

const MOST_USED = MOST_USED_IDS.map(id => SHORTCUTS.find(s => s.id === id)).filter(Boolean);

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [os, setOs] = useState('windows');
  const { favorites, toggleFavorite } = useFavorites();

  const isSearching = query.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = query.toLowerCase();
    return SHORTCUTS.filter(s =>
      s.description.toLowerCase().includes(q) ||
      s.windows.toLowerCase().includes(q) ||
      s.mac.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    );
  }, [query]);

  const topPicks = useMemo(() => SHORTCUTS.filter(s => s.tip).slice(0, 5), []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>Excel Shortcuts</Text>
            <Text style={styles.subtitle}>For college students</Text>
          </View>
          <PlatformToggle platform={os} onChange={setOs} />
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        {/* Search Results */}
        {isSearching ? (
          <View>
            <Text style={styles.sectionLabel}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
            </Text>
            {searchResults.length === 0 ? (
              <View style={styles.empty}>
                <MaterialCommunityIcons name="magnify-close" size={40} color={colors.textLight} />
                <Text style={styles.emptyText}>No shortcuts found</Text>
                <Text style={styles.emptySubtext}>Try different keywords</Text>
              </View>
            ) : (
              searchResults.map(s => (
                <ShortcutCard
                  key={s.id}
                  shortcut={s}
                  platform={os}
                  showCategory
                  isFavorite={favorites.has(s.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            )}
          </View>
        ) : (
          <>
            {/* Most Used */}
            <Text style={styles.sectionLabel}>Most Used</Text>
            {MOST_USED.map(s => (
              <ShortcutCard
                key={s.id}
                shortcut={s}
                platform={os}
                showCategory
                isFavorite={favorites.has(s.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}

            {/* Categories Grid */}
            <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>Browse by Category</Text>
            <View style={styles.grid}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.catCard}
                  onPress={() => navigation.navigate('Category', { categoryId: cat.id, os })}
                  activeOpacity={0.8}
                >
                  <View style={[styles.catIcon, { backgroundColor: cat.color + '18' }]}>
                    <MaterialCommunityIcons name={cat.icon} size={22} color={cat.color} />
                  </View>
                  <Text style={styles.catLabel}>{cat.label}</Text>
                  <Text style={styles.catCount}>
                    {SHORTCUTS.filter(s => s.category === cat.id).length} shortcuts
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Top Picks */}
            <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>Top Picks for Students</Text>
            {topPicks.map(s => (
              <ShortcutCard
                key={s.id}
                shortcut={s}
                platform={os}
                showCategory
                isFavorite={favorites.has(s.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  appTitle: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  searchWrap: { marginBottom: spacing.lg },
  sectionLabel: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    fontSize: 11,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  catCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  catLabel: { ...typography.h3, fontSize: 15, color: colors.text },
  catCount: { ...typography.caption, color: colors.textSecondary, marginTop: 2, textTransform: 'none' },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: { ...typography.h3, color: colors.textSecondary },
  emptySubtext: { ...typography.body, color: colors.textLight },
});
