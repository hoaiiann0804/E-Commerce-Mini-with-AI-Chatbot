import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user.types';
import { AuthState, AuthResponse } from '@/types/auth.types';

// Safely get tokens from localStorage
const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
};

const getStoredRefreshToken = (): string | null => {
  try {
    return localStorage.getItem('refreshToken');
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
};

const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  refreshToken: getStoredRefreshToken(),
  isAuthenticated: !!getStoredToken(),
  isLoading: false,
  error: null,
  justLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.justLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.justLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems'); // Clear cart items when logging out
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    updateTokens: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    clearJustLoggedIn: (state) => {
      state.justLoggedIn = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError,
  updateTokens,
  clearJustLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;
