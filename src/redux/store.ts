import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';

// Import reducers
import authReducer from './slices/authSlice';
import matchReducer from './slices/matchSlice';
import venueReducer from './slices/venueSlice';
import favoritesReducer from './slices/favoritesSlice';
import chatReducer from './slices/chatSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'favorites'], // Only persist auth and favorites
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedFavoritesReducer = persistReducer(
  { ...persistConfig, key: 'favorites' },
  favoritesReducer
);

// Configure store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    match: matchReducer,
    venue: venueReducer,
    favorites: persistedFavoritesReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(createLogger()),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;