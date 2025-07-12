import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MatchState {
  currentMatch: any | null;
  participants: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchState = {
  currentMatch: null,
  participants: [],
  loading: false,
  error: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setCurrentMatch: (state, action: PayloadAction<any>) => {
      state.currentMatch = action.payload;
    },
    setParticipants: (state, action: PayloadAction<any[]>) => {
      state.participants = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMatch: (state) => {
      state.currentMatch = null;
      state.participants = [];
      state.error = null;
    },
  },
});

export const { setCurrentMatch, setParticipants, setLoading, setError, clearMatch } = matchSlice.actions;
export default matchSlice.reducer;