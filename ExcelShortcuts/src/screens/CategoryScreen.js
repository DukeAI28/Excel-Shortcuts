import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES, SHORTCUTS } from '../data/shortcuts';
import ShortcutCard from '../components/ShortcutCard';
import PlatformToggle from '../components/PlatformToggle';
import { useFavorites } from '../context/FavoritesContext';
import { colors, spacing, radius, typography } from '../utils/theme';

export default function CategoryScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const [os, setOs] = useState(route.params.os || 'windows');

  const { favorites, toggleFavorite } = useFavorites();
  const category = CATEGORIES.find(c => c.id === categoryId);
  const shortcuts = SHORTCUTS.filter(s => s.category === categoryId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: category.color + '18' }]}>
          <MaterialCommunityIcons name={category.icon} size={24} color={category.color} />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{category.label}</Text>
          <Text style={styles.count}>{shortcuts.length} shortcuts</Text>
        </View>
        <PlatformToggle platform={os} onChange={setOs} />
      </View>

      <FlatList
        data={shortcuts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ShortcutCard
            shortcut={item}
            platform={os}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: { flex: 1 },
  title: { ...typography.h3, color: colors.text },
  count: { ...typography.bodySmall, color: colors.textSecondary },
  list: { padding: spacing.md, paddingBottom: spacing.xxl },
});
