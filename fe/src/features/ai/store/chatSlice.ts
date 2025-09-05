import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types/Message';

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  chatHistory: Record<string, Message[]>; // userId -> messages
}

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  chatHistory: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    // Save chat history for a user
    saveChatHistory: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      if (userId && state.messages.length > 0) {
        state.chatHistory[userId] = [...state.messages];
      }
    },
    // Load chat history for a user
    loadChatHistory: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      if (userId && state.chatHistory[userId]) {
        state.messages = [...state.chatHistory[userId]];
      } else {
        state.messages = [];
      }
    },
  },
});

export const {
  addMessage,
  setMessages,
  clearMessages,
  toggleChat,
  openChat,
  closeChat,
  saveChatHistory,
  loadChatHistory,
} = chatSlice.actions;

export default chatSlice.reducer;
