import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Location from 'expo-location';

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
}

const initialState: LocationState = {
  currentLocation: null,
  isLoading: false,
  error: null,
  hasPermission: false,
};

// Async thunks
export const requestLocationPermission = createAsyncThunk(
  'location/requestPermission',
  async (_, { rejectWithValue }) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentLocation = createAsyncThunk(
  'location/getCurrentLocation',
  async (_, { rejectWithValue }) => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.currentLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Request permission
    builder
      .addCase(requestLocationPermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLocationPermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasPermission = action.payload;
        state.error = null;
      })
      .addCase(requestLocationPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get current location
    builder
      .addCase(getCurrentLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLocation = action.payload;
        state.error = null;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLocation } = locationSlice.actions;
export default locationSlice.reducer;