import { createContext, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/features/ui/uiSlice';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Initialize theme from system preference if not set in Redux
  useEffect(() => {
    // Check system preference if theme is not already set
    if (!theme && typeof window !== 'undefined') {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        dispatch(setTheme('dark'));
      } else {
        dispatch(setTheme('light'));
      }
    }
  }, [dispatch, theme]);

  // Update document class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
