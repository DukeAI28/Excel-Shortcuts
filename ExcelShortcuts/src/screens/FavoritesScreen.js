import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHORTCUTS } from '../data/shortcuts';
import ShortcutCard from '../components/ShortcutCard';
import PlatformToggle from '../components/PlatformToggle';
import { useFavorites } from '../context/FavoritesContext';
import { colors, spacing, typography } from '../utils/theme';

export default function FavoritesScreen() {
  const [platform, setPlatform] = useState('windows');
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteShortcuts = SHORTCUTS.filter(s => favorites.has(s.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <PlatformToggle platform={platform} onChange={setPlatform} />
      </View>

      {favoriteShortcuts.length === 0 ? (
        <View style={styles.empty}>
          <MaterialCommunityIcons name="star-outline" size={52} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySub}>
            Tap the star on any shortcut{'\n'}to save it here for quick access
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteShortcuts}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ShortcutCard
              shortcut={item}
              platform={platform}
              showCategory
              isFavorite
              onToggleFavorite={toggleFavorite}
            />
          )}
          ListHeaderComponent={
            <Text style={styles.count}>
              {favoriteShortcuts.length} saved shortcut{favoriteShortcuts.length !== 1 ? 's' : ''}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  list: {
    padding: spacing.lg,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  emptySub: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
});
