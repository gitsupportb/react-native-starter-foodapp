import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationParams } from '../types';

// Import main screens
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import HistoryScreen from '../screens/main/HistoryScreen';

// Import modal screens
import MatchSetupScreen from '../screens/matching/MatchSetupScreen';
import MatchLobbyScreen from '../screens/matching/MatchLobbyScreen';
import SwipeInterfaceScreen from '../screens/matching/SwipeInterfaceScreen';
import MatchResultsScreen from '../screens/matching/MatchResultsScreen';
import VenueDetailsScreen from '../screens/venue/VenueDetailsScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Tab = createBottomTabNavigator<NavigationParams>();
const Stack = createStackNavigator<NavigationParams>();

// Home stack for nested navigation
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="MatchSetup" component={MatchSetupScreen} />
    <Stack.Screen name="MatchLobby" component={MatchLobbyScreen} />
    <Stack.Screen name="SwipeInterface" component={SwipeInterfaceScreen} />
    <Stack.Screen name="MatchResults" component={MatchResultsScreen} />
    <Stack.Screen name="VenueDetails" component={VenueDetailsScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'History':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;