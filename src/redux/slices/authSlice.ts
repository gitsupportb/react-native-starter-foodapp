import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  dietaryPreferences: string[];
  favoriteCuisines: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  user: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.userProfile = null;
      state.error = null;
    },
  },
});

export const { setUser, setUserProfile, setLoading, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer;