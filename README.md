# Food Buddy V1 🍽️

A React Native/Expo app that helps users discover restaurants through collaborative matching with friends or smart suggestions. Built with TypeScript, Firebase, and modern React Native technologies.

## Features

### 🔐 Authentication & Profiles
- Email/password sign-up and login via Firebase Auth
- Google and Facebook social login options (coming soon)
- User profile with dietary preferences, favorite cuisines, and stats
- Customizable notification settings

### 🏠 Home & Match Setup
- Main dashboard with "Start Match" and "Continue Last Match" options
- Browse saved favorites and match history
- Location-based restaurant discovery
- Smart suggestions based on preferences and time of day

### 💫 Swipe Interface
- Tinder-style card interface for restaurant selection
- Restaurant details including photos, ratings, and popular dishes
- Real-time collaborative matching with friends
- In-app chat during matching sessions

### 🎯 Match Detection & Results
- Two-person instant matches and group voting system
- Results screen with winning venues and directions
- OpenTable/TheFork integration for reservations
- Split-bill estimator

### ❤️ Favorites & History
- Save favorite restaurants with personal notes
- View past match sessions with re-match option
- Offline caching of recent restaurants

### 📱 Additional Features
- Push notifications for match updates
- "Boost" feature for prioritizing votes (monetization)
- Comprehensive analytics dashboard
- E2E testing with Detox

## Tech Stack

- **Framework**: React Native + Expo (managed workflow)
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit + Redux Persist
- **UI**: React Native Elements + Custom Components
- **Animations**: React Native Reanimated 3
- **Backend**: Firebase (Auth, Firestore, Cloud Functions, Storage)
- **Location**: Expo Location
- **Maps**: React Native Maps + Google Places API
- **Testing**: Jest + Detox
- **CI/CD**: Expo EAS Build

## Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Studio
- Firebase project
- Google Maps/Places API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd food-buddy-v1
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Generate a new web app configuration
5. Update `src/config/firebase.ts` with your Firebase config:

```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Google Places API

1. Enable Google Places API in [Google Cloud Console](https://console.cloud.google.com)
2. Create an API key with Places API permissions
3. Update `src/config/firebase.ts` with your API key:

```typescript
export const GOOGLE_PLACES_API_KEY = "your-google-places-api-key";
```

4. Add the API key to `app.json`:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_GOOGLE_MAPS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

### 4. Assets Setup

Add required assets to the `assets/` directory:
- `icon.png` (1024x1024) - App icon
- `splash.png` (2048x2732) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon
- `notification-icon.png` (256x256) - Notification icon

### 5. Font Setup

Download and add Inter font files to `assets/fonts/`:
- `Inter-Regular.ttf`
- `Inter-Bold.ttf`
- `Inter-SemiBold.ttf`

### 6. Firebase Security Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Match sessions
    match /matchSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Chat messages
    match /chatMessages/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 7. Cloud Functions (Optional)

Deploy Cloud Functions for match detection:

```bash
cd functions
npm install
firebase deploy --only functions
```

### 8. EAS Configuration

Initialize EAS for building:

```bash
eas build:configure
```

Update `eas.json` with your project configuration.

## Development

### Start Development Server

```bash
npm start
# or
expo start
```

### Run on Devices

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

### Testing

```bash
# Unit tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

### Building for Production

```bash
# Build for both platforms
npm run build

# Build for specific platform
npm run build:ios
npm run build:android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── main/          # Main app screens
│   ├── matching/      # Match-related screens
│   ├── venue/         # Venue detail screens
│   └── chat/          # Chat screens
├── navigation/         # Navigation configuration
├── store/             # Redux store and slices
│   └── slices/        # Redux Toolkit slices
├── contexts/          # React Context providers
├── services/          # API and external services
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── constants/         # App constants
└── config/            # Configuration files

assets/
├── fonts/             # Custom fonts
├── images/            # App images
└── icons/             # App icons
```

## Key Components

### Authentication Flow
- `AuthContext` manages Firebase Auth state
- `LoginScreen` and `RegisterScreen` handle user authentication
- Automatic navigation based on auth state

### Location Services
- `LocationContext` manages user location
- Permission handling and location updates
- Integration with Google Places API

### Restaurant Matching
- Redux state management for match sessions
- Real-time collaboration via Firestore
- Swipe interface with haptic feedback

### Navigation
- Stack and tab navigation with React Navigation
- Type-safe navigation with TypeScript
- Deep linking support

## Firebase Integration

### Authentication
- Email/password authentication
- Google Sign-In integration
- User profile management

### Firestore Collections
- `users` - User profiles and preferences
- `matchSessions` - Match session data
- `chatMessages` - In-app chat messages
- `restaurants` - Cached restaurant data

### Cloud Functions
- Match detection algorithm
- Push notification triggers
- Smart suggestion engine

## Monetization Features

### In-App Purchases
- "Boost" feature for prioritizing votes
- Premium filters and preferences
- Advanced analytics dashboard

### Affiliate Integration
- OpenTable/TheFork reservation links
- Restaurant partnership revenue
- Referral tracking system

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Conventional commit messages

### Testing
- Unit tests with Jest
- E2E tests with Detox
- Component testing with React Native Testing Library

### Performance
- Image optimization and caching
- Lazy loading of screens
- Efficient state management

## Deployment

### Expo EAS Build
- Automated builds for iOS and Android
- TestFlight and Google Play integration
- Over-the-air updates with Expo Updates

### CI/CD Pipeline
- Automated testing on PR
- Build automation with EAS
- Release management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run tests and linting
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

Built with ❤️ using React Native and Expo
