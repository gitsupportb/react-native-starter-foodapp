// Firebase configuration for Food Buddy V1
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCDEFGHIJ"
};

// Google Places API configuration
export const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY_HERE";

// Firebase Cloud Function URLs
export const CLOUD_FUNCTIONS_BASE_URL = "https://YOUR_REGION-your-project-id.cloudfunctions.net";

// App configuration
export const APP_CONFIG = {
  // Default search radius in kilometers
  DEFAULT_SEARCH_RADIUS: 5,
  
  // Maximum search radius in kilometers
  MAX_SEARCH_RADIUS: 25,
  
  // Number of restaurants to cache offline
  OFFLINE_CACHE_SIZE: 50,
  
  // Smart suggest algorithm weights
  SMART_SUGGEST_WEIGHTS: {
    userPreferences: 0.4,
    timeOfDay: 0.3,
    pastLikes: 0.2,
    distance: 0.1
  },
  
  // Supported dietary preferences
  DIETARY_PREFERENCES: [
    'vegan',
    'vegetarian',
    'halal',
    'kosher',
    'gluten-free',
    'dairy-free',
    'keto',
    'paleo'
  ],
  
  // Supported cuisines
  CUISINE_TYPES: [
    'italian',
    'chinese',
    'japanese',
    'indian',
    'mexican',
    'french',
    'thai',
    'american',
    'mediterranean',
    'korean',
    'vietnamese',
    'middle-eastern'
  ],
  
  // Price tiers
  PRICE_TIERS: [
    { id: 1, label: '$', description: 'Budget-friendly' },
    { id: 2, label: '$$', description: 'Moderate' },
    { id: 3, label: '$$$', description: 'Expensive' },
    { id: 4, label: '$$$$', description: 'Very Expensive' }
  ]
};