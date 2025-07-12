// Type definitions for Food Buddy V1

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  preferredPriceRange: number[];
  defaultRadius: number;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  matchFound: boolean;
  friendJoined: boolean;
  newSuggestions: boolean;
  marketing: boolean;
}

export interface UserStats {
  totalMatches: number;
  totalSwipes: number;
  favoriteRestaurants: number;
  friendsConnected: number;
}

export interface Restaurant {
  id: string;
  name: string;
  placeId: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  priceLevel: number;
  cuisineTypes: string[];
  photos: string[];
  hours: OpeningHours;
  phoneNumber?: string;
  website?: string;
  distance?: number;
  popularDish?: string;
  specialtyBadges: string[];
  menuPreview?: MenuItem[];
}

export interface OpeningHours {
  isOpen: boolean;
  periods: {
    open: { day: number; time: string };
    close: { day: number; time: string };
  }[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
  category: string;
  dietary: string[];
}

export interface MatchSession {
  id: string;
  type: 'two-person' | 'group';
  hostId: string;
  participants: Participant[];
  filters: SearchFilters;
  restaurants: Restaurant[];
  swipes: Swipe[];
  status: 'lobby' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  results?: MatchResult[];
  chatId?: string;
}

export interface Participant {
  userId: string;
  displayName: string;
  photoURL?: string;
  isReady: boolean;
  joinedAt: Date;
  isHost: boolean;
}

export interface SearchFilters {
  radius: number;
  priceRange: number[];
  dietary: string[];
  cuisines: string[];
  openNow: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Swipe {
  userId: string;
  restaurantId: string;
  direction: 'like' | 'dislike';
  timestamp: Date;
  sessionId: string;
}

export interface MatchResult {
  restaurant: Restaurant;
  votes: number;
  percentage: number;
  voters: string[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'restaurant' | 'system';
  restaurantId?: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  restaurant: Restaurant;
  addedAt: Date;
  tags: string[];
  notes?: string;
}

export interface SmartSuggestion {
  restaurants: Restaurant[];
  score: number;
  reasoning: string;
  timestamp: Date;
}

export interface PushNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data?: any;
  type: 'match_found' | 'friend_joined' | 'new_suggestions' | 'marketing';
  read: boolean;
  createdAt: Date;
}

export interface AppState {
  user: {
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
  };
  location: {
    currentLocation: {
      latitude: number;
      longitude: number;
    } | null;
    isLoading: boolean;
    error: string | null;
  };
  restaurants: {
    nearby: Restaurant[];
    favorites: UserFavorite[];
    cached: Restaurant[];
    isLoading: boolean;
    error: string | null;
  };
  matching: {
    currentSession: MatchSession | null;
    isLoading: boolean;
    error: string | null;
  };
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
  };
  notifications: {
    unread: PushNotification[];
    isLoading: boolean;
    error: string | null;
  };
}

export interface NavigationParams {
  // Root level
  Auth: undefined;
  Main: undefined;
  
  // Auth screens
  Login: undefined;
  Register: undefined;
  
  // Main app screens
  Home: undefined;
  HomeStack: undefined;
  Profile: undefined;
  EditProfile: undefined;
  MatchSetup: undefined;
  MatchLobby: { sessionId: string };
  SwipeInterface: { sessionId: string };
  MatchResults: { sessionId: string };
  VenueDetails: { restaurant: Restaurant };
  Favorites: undefined;
  History: undefined;
  Chat: { sessionId: string };
  Settings: undefined;
  Notifications: undefined;
  
  // Add index signature for ParamListBase compatibility
  [key: string]: undefined | object;
}

export interface GooglePlacesResponse {
  results: GooglePlace[];
  status: string;
  next_page_token?: string;
}

export interface GooglePlace {
  place_id: string;
  name: string;
  rating: number;
  price_level: number;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  rating: number;
  price_level: number;
  opening_hours?: {
    open_now: boolean;
    periods: {
      open: { day: number; time: string };
      close: { day: number; time: string };
    }[];
  };
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
  reviews?: {
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }[];
}

export interface FirebaseError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type SwipeDirection = 'like' | 'dislike';
export type SessionType = 'two-person' | 'group';
export type SessionStatus = 'lobby' | 'active' | 'completed' | 'cancelled';
export type MessageType = 'text' | 'restaurant' | 'system';
export type NotificationType = 'match_found' | 'friend_joined' | 'new_suggestions' | 'marketing';