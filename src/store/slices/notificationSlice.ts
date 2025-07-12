import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PushNotification } from '../../types';

interface NotificationState {
  unread: PushNotification[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  unread: [],
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<PushNotification>) => {
      state.unread.push(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      state.unread = state.unread.filter(notif => notif.id !== action.payload);
    },
    markAllAsRead: (state) => {
      state.unread = [];
    },
    setNotifications: (state, action: PayloadAction<PushNotification[]>) => {
      state.unread = action.payload;
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
  addNotification,
  markAsRead,
  markAllAsRead,
  setNotifications,
  setLoading,
  setError,
  clearError,
} = notificationSlice.actions;

export default notificationSlice.reducer;