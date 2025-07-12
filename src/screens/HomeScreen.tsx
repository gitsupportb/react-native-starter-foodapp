import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  Avatar,
  FAB,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../themes/theme';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userProfile, signOutUser } = useAuth();

  const handleStartMatch = (type: 'two-person' | 'group') => {
    navigation.navigate('Lobby' as never, { type } as never);
  };

  const handleContinueLastMatch = () => {
    // Navigate to the last active match
    navigation.navigate('Swipe' as never);
  };

  const handleViewFavorites = () => {
    navigation.navigate('Favorites' as never);
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Avatar.Text 
              size={50} 
              label={userProfile?.displayName?.charAt(0) || 'U'} 
              style={styles.avatar}
            />
            <View style={styles.userText}>
              <Title style={styles.greeting}>
                Hello, {userProfile?.displayName || 'Foodie'}! 👋
              </Title>
              <Paragraph style={styles.subtitle}>
                Ready to find your next meal?
              </Paragraph>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Start New Match</Title>
              <Paragraph style={styles.cardSubtitle}>
                Find a restaurant with friends
              </Paragraph>
              
              <View style={styles.buttonGroup}>
                <Button
                  mode="contained"
                  onPress={() => handleStartMatch('two-person')}
                  style={[styles.button, styles.primaryButton]}
                  icon="account-multiple"
                >
                  Two Person
                </Button>
                
                <Button
                  mode="contained"
                  onPress={() => handleStartMatch('group')}
                  style={[styles.button, styles.secondaryButton]}
                  icon="account-group"
                >
                  Group
                </Button>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Continue Last Match</Title>
              <Paragraph style={styles.cardSubtitle}>
                Resume your previous session
              </Paragraph>
              
              <Button
                mode="outlined"
                onPress={handleContinueLastMatch}
                style={styles.button}
                icon="play-circle"
              >
                Continue
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Your Favorites</Title>
              <Paragraph style={styles.cardSubtitle}>
                View your saved restaurants
              </Paragraph>
              
              <Button
                mode="outlined"
                onPress={handleViewFavorites}
                style={styles.button}
                icon="heart"
              >
                View Favorites
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Recent Activity</Title>
          
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Last Match</Title>
              <Paragraph style={styles.cardSubtitle}>
                You matched on "Pizza Palace" with Sarah
              </Paragraph>
              <Text style={styles.timestamp}>2 hours ago</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* FAB for Profile */}
      <FAB
        style={styles.fab}
        icon="account"
        onPress={handleViewProfile}
        label="Profile"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  userText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    color: theme.colors.onBackground,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.onBackground,
    opacity: 0.7,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
  },
  card: {
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  cardSubtitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
    opacity: 0.7,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.onBackground,
    opacity: 0.5,
    marginTop: theme.spacing.sm,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;