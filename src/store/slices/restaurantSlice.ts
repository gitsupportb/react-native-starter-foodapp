import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant, UserFavorite } from '../../types';

interface RestaurantState {
  nearby: Restaurant[];
  favorites: UserFavorite[];
  cached: Restaurant[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  nearby: [],
  favorites: [],
  cached: [],
  isLoading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setNearbyRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.nearby = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<UserFavorite>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    setCachedRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.cached = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setNearbyRestaurants,
  addToFavorites,
  removeFromFavorites,
  setCachedRestaurants,
  setLoading,
  setError,
  clearError,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;