import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { location, hasPermission, requestPermission } = useLocation();

  const handleStartMatch = () => {
    if (!location && hasPermission) {
      requestPermission();
      return;
    }
    navigation.navigate('MatchSetup' as never);
  };

  const handleViewFavorites = () => {
    navigation.navigate('Favorites' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {user?.displayName || 'Food Lover'}!
          </Text>
          <Text style={styles.subtitle}>
            Ready to discover your next favorite restaurant?
          </Text>
        </View>

        {!hasPermission && (
          <View style={styles.locationPrompt}>
            <Text style={styles.locationText}>
              Enable location to find restaurants near you
            </Text>
            <TouchableOpacity style={styles.locationButton} onPress={requestPermission}>
              <Text style={styles.locationButtonText}>Enable Location</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryAction} onPress={handleStartMatch}>
            <Text style={styles.primaryActionText}>Start New Match</Text>
            <Text style={styles.primaryActionSubtext}>
              Find restaurants with friends or solo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Continue Last Match</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction} onPress={handleViewFavorites}>
            <Text style={styles.secondaryActionText}>View Favorites</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.smartSuggest}>
          <Text style={styles.sectionTitle}>Smart Suggestions</Text>
          <Text style={styles.sectionSubtitle}>
            Based on your preferences and time of day
          </Text>
          <TouchableOpacity style={styles.smartSuggestButton}>
            <Text style={styles.smartSuggestText}>Get Suggestions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickStats}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.stats.totalMatches || 0}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.stats.favoriteRestaurants || 0}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.stats.friendsConnected || 0}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  locationPrompt: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 12,
    textAlign: 'center',
  },
  locationButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    gap: 16,
    marginBottom: 32,
  },
  primaryAction: {
    backgroundColor: '#FF6B6B',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  primaryActionSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  secondaryAction: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  smartSuggest: {
    backgroundColor: '#F0F9FF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  smartSuggestButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  smartSuggestText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quickStats: {
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});

export default HomeScreen;