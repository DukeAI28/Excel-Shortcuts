import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext(null);
const STORAGE_KEY = '@xlsc_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(json => { if (json) setFavorites(new Set(JSON.parse(json))); })
      .catch(() => {});
  }, []);

  function toggleFavorite(id) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...next])).catch(() => {});
      return next;
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
