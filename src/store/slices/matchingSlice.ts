import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchSession, Swipe, MatchResult } from '../../types';

interface MatchingState {
  currentSession: MatchSession | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MatchingState = {
  currentSession: null,
  isLoading: false,
  error: null,
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    setCurrentSession: (state, action: PayloadAction<MatchSession | null>) => {
      state.currentSession = action.payload;
    },
    addSwipe: (state, action: PayloadAction<Swipe>) => {
      if (state.currentSession) {
        state.currentSession.swipes.push(action.payload);
      }
    },
    setResults: (state, action: PayloadAction<MatchResult[]>) => {
      if (state.currentSession) {
        state.currentSession.results = action.payload;
        state.currentSession.status = 'completed';
      }
    },
    updateSessionStatus: (state, action: PayloadAction<'lobby' | 'active' | 'completed' | 'cancelled'>) => {
      if (state.currentSession) {
        state.currentSession.status = action.payload;
      }
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
    clearSession: (state) => {
      state.currentSession = null;
    },
  },
});

export const {
  setCurrentSession,
  addSwipe,
  setResults,
  updateSessionStatus,
  setLoading,
  setError,
  clearError,
  clearSession,
} = matchingSlice.actions;

export default matchingSlice.reducer;