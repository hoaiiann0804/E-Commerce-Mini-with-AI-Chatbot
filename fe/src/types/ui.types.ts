// UI Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
}

export interface UIState {
  notifications: Notification[];
  theme: 'light' | 'dark';
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
}

export interface AddNotificationPayload {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
}
