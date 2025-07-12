import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VenueState {
  venues: any[];
  currentVenue: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: VenueState = {
  venues: [],
  currentVenue: null,
  loading: false,
  error: null,
};

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    setVenues: (state, action: PayloadAction<any[]>) => {
      state.venues = action.payload;
    },
    setCurrentVenue: (state, action: PayloadAction<any>) => {
      state.currentVenue = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearVenues: (state) => {
      state.venues = [];
      state.currentVenue = null;
      state.error = null;
    },
  },
});

export const { setVenues, setCurrentVenue, setLoading, setError, clearVenues } = venueSlice.actions;
export default venueSlice.reducer;