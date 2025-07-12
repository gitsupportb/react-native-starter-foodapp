import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

let app: any;
let auth: any;
let firestore: any;
let functions: any;
let messaging: any;
let analytics: any;

export const initializeFirebase = async () => {
  try {
    // Initialize Firebase app
    app = initializeApp(firebaseConfig);
    
    // Initialize Auth with AsyncStorage persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    
    // Initialize other Firebase services
    firestore = getFirestore(app);
    functions = getFunctions(app);
    
    // Initialize messaging (only in production)
    if (__DEV__ === false) {
      messaging = getMessaging(app);
    }
    
    // Initialize analytics
    analytics = getAnalytics(app);
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => auth;
export const getFirebaseFirestore = () => firestore;
export const getFirebaseFunctions = () => functions;
export const getFirebaseMessaging = () => messaging;
export const getFirebaseAnalytics = () => analytics;

// Firestore collections
export const COLLECTIONS = {
  USERS: 'users',
  MATCHES: 'matches',
  VENUES: 'venues',
  FAVORITES: 'favorites',
  CHATS: 'chats',
  MESSAGES: 'messages',
  SESSIONS: 'sessions',
} as const;

// Firestore security rules (for reference)
export const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own favorites
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Match participants can read/write match data
    match /matches/{matchId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Chat participants can read/write messages
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Messages in chats
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
    }
    
    // Venues are read-only for all authenticated users
    match /venues/{venueId} {
      allow read: if request.auth != null;
    }
    
    // Sessions are read/write for participants
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
  }
}
`;