'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode, useCallback } from 'react';
import { ConfigProvider, theme as antdTheme, Switch } from 'antd';
import { ThemeConfig } from 'antd';
import { themes, ThemeMode } from './index';
import thTH from 'antd/locale/th_TH';
import enUS from 'antd/locale/en_US';

// Types
interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  locale: 'th' | 'en';
  setLocale: (locale: 'th' | 'en') => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  defaultLocale?: 'th' | 'en';
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Local storage keys
const THEME_STORAGE_KEY = 'wegowhere-theme-mode';
const LOCALE_STORAGE_KEY = 'wegowhere-locale';

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  defaultLocale = 'th',
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultTheme);
  const [locale, setLocaleState] = useState<'th' | 'en'>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  // Load theme and locale from localStorage on mount
  useEffect(() => {
    let isMounted = true;

    const initializeTheme = () => {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as 'th' | 'en';

      if (isMounted) {
        if (savedTheme && themes[savedTheme]) {
          setThemeModeState(savedTheme);
        } else {
          // Auto-detect system theme preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setThemeModeState(prefersDark ? 'dark' : 'light');
        }

        if (savedLocale) {
          setLocaleState(savedLocale);
        }

        setMounted(true);
      }
    };

    // Use requestAnimationFrame to avoid synchronous state updates
    const frameId = requestAnimationFrame(initializeTheme);

    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Update localStorage when theme changes
  useLayoutEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);

      // Update CSS custom properties for integration with other styling systems
      const root = document.documentElement;
      const currentTheme = themes[themeMode];

      if (currentTheme.token) {
        // Update CSS variables
        root.style.setProperty('--ant-color-primary', currentTheme.token.colorPrimary || '#3b82f6');
        root.style.setProperty('--ant-color-bg-base', currentTheme.token.colorBgBase || '#ffffff');
        root.style.setProperty('--ant-color-text', currentTheme.token.colorText || '#000000');
        root.style.setProperty('--ant-border-radius', `${currentTheme.token.borderRadius || 6}px`);
      }

      // Update body class for theme-specific styling
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${themeMode}`);
    }
  }, [themeMode, mounted]);

  // Update localStorage when locale changes
  useLayoutEffect(() => {
    if (mounted) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);

      // Update document lang attribute
      document.documentElement.lang = locale === 'th' ? 'th' : 'en';
    }
  }, [locale, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme && mounted) {
        // Use timeout to prevent synchronous state update
        setTimeout(() => {
          setThemeModeState(e.matches ? 'dark' : 'light');
        }, 0);
      }
    };

    if (mounted) {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      if (mounted) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [mounted]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setLocale = useCallback((newLocale: 'th' | 'en') => {
    setLocaleState(newLocale);
  }, []);

  const contextValue: ThemeContextType = {
    themeMode,
    toggleTheme,
    setThemeMode,
    locale,
    setLocale,
  };

  // Get current theme config
  const currentTheme: ThemeConfig = {
    ...themes[themeMode],
    algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  // Get current locale config
  const currentLocale = locale === 'th' ? thTH : enUS;

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={currentTheme}
        locale={currentLocale}
        componentSize="middle"
        direction="ltr"
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// Theme Toggle Component
export const ThemeToggle: React.FC<{
  className?: string;
  size?: 'small' | 'default';
  showLabel?: boolean;
}> = ({ className, size = 'default', showLabel = false }) => {
  const { themeMode, toggleTheme } = useTheme();

  const SunIcon = (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  const MoonIcon = (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {themeMode === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
      <Switch
        checked={themeMode === 'dark'}
        onChange={toggleTheme}
        size={size}
        checkedChildren={MoonIcon}
        unCheckedChildren={SunIcon}
        aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
      />
    </div>
  );
};

// Locale Toggle Component
export const LocaleToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { locale, setLocale } = useTheme();

  return (
    <button
      onClick={() => setLocale(locale === 'th' ? 'en' : 'th')}
      className={className}
      aria-label={`Switch to ${locale === 'th' ? 'English' : 'Thai'} language`}
      type="button"
    >
      <span className="text-sm font-medium">
        {locale === 'th' ? 'EN' : 'TH'}
      </span>
    </button>
  );
};

export default ThemeProvider;