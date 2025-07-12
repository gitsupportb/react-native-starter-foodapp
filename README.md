# Food Buddy V1 🍽️

A React Native/Expo app that helps friends find the perfect restaurant together through a fun swiping interface and smart matching algorithm.

## Features

### 🔐 Authentication & Profiles
- Email/password sign-up and login via Firebase Auth
- Google and Facebook social login options
- User profile management with photo upload
- Dietary preferences (vegan, halal, gluten-free)
- Favorite cuisines selection
- Past matches history

### 🏠 Home & Match Setup
- Home screen with "Start Match" options (two-person or group)
- "Continue Last Match" functionality
- Browse saved favorites
- Lobby system with room PIN and participant management
- Advanced filters (radius, price tiers, dietary restrictions, "Open Now")
- "Smart Suggest" algorithm for venue recommendations

### 💫 Swipe Interface
- Centered restaurant cards with comprehensive information
- Cuisine type tags and distance display
- Star ratings and price tier indicators
- Specialty badges and popular dish highlights
- Heart and cross buttons with haptic feedback
- In-room chat integration

### 📍 Venue Details
- Full photo carousel (Google Places Photos API)
- Interactive MapView integration
- Complete place details and opening hours
- "Reserve Table" deep links to OpenTable/TheFork
- Direct restaurant calling
- Menu preview when available

### 🎯 Match Detection & Results
- Real-time Firestore Cloud Functions for match detection
- Immediate navigation to results for two-person matches
- Vote aggregation and ranking for group matches
- Results screen with map integration
- "Get Directions" functionality
- Split-bill estimator
- Share match results via SMS/WhatsApp
- Save to favorites option

### ⭐ Favorites & History
- Profile tab with saved favorites
- Past match sessions with "Re-match" functionality
- Offline caching of last 50 restaurants

### 🔔 Push Notifications & Analytics
- Firebase Cloud Messaging setup
- Notifications for friends joining, matches found, and smart suggestions
- Firebase Analytics integration
- Event tracking for swipes, matches, and sessions

### 💰 Monetization Features
- "Boost" feature for priority likes in group polls
- Affiliate tracking for reservation links
- In-app purchase integration

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Redux Toolkit with Redux Persist
- **UI Components**: React Native Paper
- **Animations**: React Native Reanimated & Gesture Handler
- **Backend**: Firebase (Auth, Firestore, Functions, Analytics, Cloud Messaging)
- **Maps**: React Native Maps
- **Location**: Expo Location
- **Haptics**: Expo Haptics
- **Testing**: Jest & Detox
- **Build & Deploy**: EAS Build

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Firebase project
- Google Places API key
- Apple Developer Account (for iOS builds)
- Google Play Console (for Android builds)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-buddy-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, Functions, Analytics, and Cloud Messaging
   - Download your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Update `src/services/firebase.ts` with your Firebase configuration

4. **Configure Google Places API**
   - Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Places API, Maps API, and Geocoding API
   - Add the API key to your environment variables

5. **Configure Social Login**
   - Set up Google Sign-In in Firebase Console
   - Configure Facebook App for Facebook Login
   - Update the respective configuration files

6. **Environment Setup**
   ```bash
   # Create environment file
   cp .env.example .env
   # Add your API keys and configuration
   ```

## Development

### Start the development server
```bash
npm start
# or
yarn start
```

### Run on iOS Simulator
```bash
npm run ios
# or
yarn ios
```

### Run on Android Emulator
```bash
npm run android
# or
yarn android
```

### Run tests
```bash
# Unit tests
npm test

# E2E tests
npm run e2e:test
```

## Building for Production

### iOS
```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android
```bash
# Build for Android
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── redux/              # Redux store and slices
│   └── slices/         # Redux Toolkit slices
├── screens/            # Screen components
├── services/           # API services and utilities
├── themes/             # Theme configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Firebase Security Rules

The app includes production-ready Firestore security rules that ensure:
- Users can only read/write their own profile data
- Match participants can access shared match data
- Chat participants can read/write messages
- Venues are read-only for authenticated users

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@foodbuddy.com or join our Slack channel.

## Roadmap

- [ ] Voice chat integration
- [ ] AR restaurant preview
- [ ] AI-powered cuisine recommendations
- [ ] Integration with food delivery services
- [ ] Restaurant loyalty programs
- [ ] Group payment splitting
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Apple Watch companion app
- [ ] Web dashboard for restaurant owners

---

Made with ❤️ by the Food Buddy team
