import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography } from '../utils/theme';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import AllShortcutsScreen from '../screens/AllShortcutsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: true, headerBackTitle: 'Back' }}
      />
    </HomeStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: { ...typography.caption, fontSize: 11 },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home-outline',
              AllShortcuts: 'lightning-bolt-outline',
            };
            return <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNav} options={{ title: 'Explore' }} />
        <Tab.Screen name="AllShortcuts" component={AllShortcutsScreen} options={{ title: 'All Shortcuts' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
