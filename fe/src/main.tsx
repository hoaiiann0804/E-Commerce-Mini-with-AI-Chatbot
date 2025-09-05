import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { initializeCart } from '@/features/cart/cartSlice';
import './config/i18n'; // Initialize i18n
import App from './App';

// Initialize cart from localStorage
store.dispatch(initializeCart());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
