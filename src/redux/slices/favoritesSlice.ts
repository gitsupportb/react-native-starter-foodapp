import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<any[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearFavorites: (state) => {
      state.favorites = [];
      state.error = null;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, setLoading, setError, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;