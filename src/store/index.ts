import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import logger from 'redux-logger';

// Import reducers
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';
import restaurantReducer from './slices/restaurantSlice';
import matchingReducer from './slices/matchingSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'restaurants'], // Only persist user and restaurants data
  blacklist: ['location', 'matching', 'chat', 'notifications'], // Don't persist these
};

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  restaurants: restaurantReducer,
  matching: matchingReducer,
  chat: chatReducer,
  notifications: notificationReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(__DEV__ ? logger : []),
  devTools: __DEV__,
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;