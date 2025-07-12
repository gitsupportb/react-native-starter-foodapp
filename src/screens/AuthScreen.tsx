import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../themes/theme';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && !displayName) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // This would need to be implemented with @react-native-google-signin/google-signin
      Alert.alert('Info', 'Google Sign-In will be implemented');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    try {
      // This would need to be implemented with react-native-fbsdk-next
      Alert.alert('Info', 'Facebook Sign-In will be implemented');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Facebook sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍽️</Text>
          <Title style={styles.title}>Food Buddy V1</Title>
          <Paragraph style={styles.subtitle}>
            Find the perfect restaurant with friends
          </Paragraph>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              {isLogin ? 'Welcome Back!' : 'Join Food Buddy'}
            </Title>

            {!isLogin && (
              <TextInput
                label="Full Name"
                value={displayName}
                onChangeText={setDisplayName}
                style={styles.input}
                mode="outlined"
                autoCapitalize="words"
              />
            )}

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <Button
              mode="contained"
              onPress={handleAuth}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            <Divider style={styles.divider} />

            <Button
              mode="outlined"
              onPress={handleGoogleSignIn}
              style={styles.socialButton}
              disabled={loading}
              icon="google"
            >
              Continue with Google
            </Button>

            <Button
              mode="outlined"
              onPress={handleFacebookSignIn}
              style={styles.socialButton}
              disabled={loading}
              icon="facebook"
            >
              Continue with Facebook
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <Button
            mode="text"
            onPress={() => setIsLogin(!isLogin)}
            style={styles.linkButton}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.onBackground,
    textAlign: 'center',
  },
  card: {
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
  socialButton: {
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.onBackground,
  },
  linkButton: {
    marginLeft: -theme.spacing.sm,
  },
});

export default AuthScreen;