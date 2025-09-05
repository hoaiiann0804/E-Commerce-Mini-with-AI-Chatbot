import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../locales/en.json';
import viTranslations from '../locales/vi.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  vi: {
    translation: viTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'vi', // Default to Vietnamese
  fallbackLng: 'vi',

  interpolation: {
    escapeValue: false, // React already does escaping
  },

  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',

  // Namespace configuration
  defaultNS: 'translation',
  ns: ['translation'],

  // Detection options
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  },
});

export default i18n;
