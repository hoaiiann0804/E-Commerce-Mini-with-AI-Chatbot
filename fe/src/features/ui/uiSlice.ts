import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Notification,
  UIState,
  AddNotificationPayload,
} from '@/types/ui.types';

// Get theme from localStorage or default to 'light'
const savedTheme =
  typeof window !== 'undefined'
    ? (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    : 'light';

const initialState: UIState = {
  notifications: [],
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isLoading: false,
  theme: savedTheme,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AddNotificationPayload>) => {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  toggleSearch,
  toggleMobileMenu,
  setLoading,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
