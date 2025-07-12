import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  messages: any[];
  currentChat: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  currentChat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setCurrentChat: (state, action: PayloadAction<any>) => {
      state.currentChat = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.currentChat = null;
      state.error = null;
    },
  },
});

export const { setMessages, addMessage, setCurrentChat, setLoading, setError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;