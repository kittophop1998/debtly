'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { COLORS } from '../../src/theme';
import './theme.css';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
    themeMode: ThemeMode;
    actualTheme: 'light' | 'dark'; // The actual resolved theme
    setTheme: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: ThemeMode;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
    // Initialize theme from localStorage or default
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as ThemeMode;
            if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
                return savedTheme;
            }
        }
        return defaultTheme;
    });

    // Track system theme separately to trigger re-renders
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    // Calculate actual theme based on current mode
    const actualTheme = useMemo((): 'light' | 'dark' => {
        switch (themeMode) {
            case 'dark':
                return 'dark';
            case 'light':
                return 'light';
            case 'system':
                return systemTheme;
            default:
                return 'light';
        }
    }, [themeMode, systemTheme]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Save theme to localStorage
    const setTheme = (mode: ThemeMode) => {
        setThemeMode(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', mode);
        }
    };

    const toggleTheme = () => {
        const newMode = actualTheme === 'light' ? 'dark' : 'light';
        setTheme(newMode);
    };

    // Apply theme to document
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', actualTheme === 'dark');
            document.documentElement.setAttribute('data-theme', actualTheme);
        }
    }, [actualTheme]);

    // Ant Design Theme Configuration
    const antdThemeConfig: ThemeConfig = {
        algorithm: actualTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
            // Brand colors
            colorPrimary: COLORS.primary[500],
            colorSuccess: COLORS.success[500],
            colorWarning: COLORS.warning[500],
            colorError: COLORS.error[500],
            colorInfo: COLORS.secondary[500],

            // Background colors
            colorBgBase: actualTheme === 'dark' ? COLORS.neutral[900] : '#ffffff',
            colorBgContainer: actualTheme === 'dark' ? COLORS.neutral[800] : '#ffffff',
            colorBgElevated: actualTheme === 'dark' ? COLORS.neutral[700] : '#ffffff',
            colorBgLayout: actualTheme === 'dark' ? COLORS.neutral[900] : COLORS.neutral[50],

            // Text colors
            colorText: actualTheme === 'dark' ? COLORS.neutral[100] : COLORS.neutral[900],
            colorTextSecondary: actualTheme === 'dark' ? COLORS.neutral[300] : COLORS.neutral[600],
            colorTextTertiary: actualTheme === 'dark' ? COLORS.neutral[500] : COLORS.neutral[400],
            colorTextQuaternary: actualTheme === 'dark' ? COLORS.neutral[600] : COLORS.neutral[300],

            // Border colors
            colorBorder: actualTheme === 'dark' ? COLORS.neutral[700] : COLORS.neutral[200],
            colorBorderSecondary: actualTheme === 'dark' ? COLORS.neutral[800] : COLORS.neutral[100],

            // Font settings
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: 16,
            fontSizeHeading1: 48,
            fontSizeHeading2: 36,
            fontSizeHeading3: 30,
            fontSizeHeading4: 24,
            fontSizeHeading5: 20,

            // Border radius
            borderRadius: 8,
            borderRadiusLG: 12,
            borderRadiusSM: 6,
            borderRadiusXS: 4,

            // Control settings
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,
            controlHeightXS: 24,

            // Motion settings
            motionDurationSlow: '0.3s',
            motionDurationMid: '0.2s',
            motionDurationFast: '0.1s',
        },
        components: {
            Button: {
                borderRadius: 8,
                controlHeight: 40,
                fontWeight: 500,
            },
            Card: {
                borderRadius: 12,
                paddingLG: 24,
            },
            Input: {
                borderRadius: 8,
                controlHeight: 40,
            },
            Modal: {
                borderRadius: 12,
            },
            Drawer: {
                borderRadius: 12,
            },
            Table: {
                borderRadius: 8,
            },
            Tabs: {
                borderRadius: 8,
            },
            Select: {
                borderRadius: 8,
                controlHeight: 40,
            },
            DatePicker: {
                borderRadius: 8,
                controlHeight: 40,
            },
            Upload: {
                borderRadius: 8,
            },
        },
    };

    const contextValue: ThemeContextValue = {
        themeMode,
        actualTheme,
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <ConfigProvider theme={antdThemeConfig}>
                <div
                    className={`theme-provider ${actualTheme}`}
                    data-theme={actualTheme}
                >
                    {children}
                </div>
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}

// Theme Toggle Component
interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { themeMode, actualTheme, setTheme } = useTheme();

    const handleThemeChange = () => {
        const modes: ThemeMode[] = ['light', 'dark', 'system'];
        const currentIndex = modes.indexOf(themeMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setTheme(modes[nextIndex]);
    };

    const getIcon = () => {
        switch (themeMode) {
            case 'light':
                return '☀️';
            case 'dark':
                return '🌙';
            case 'system':
                return '💻';
            default:
                return '☀️';
        }
    };

    const getLabel = () => {
        switch (themeMode) {
            case 'light':
                return 'Light';
            case 'dark':
                return 'Dark';
            case 'system':
                return `System (${actualTheme})`;
            default:
                return 'Light';
        }
    };

    return (
        <button
            onClick={handleThemeChange}
            className={`theme-toggle ${className}`}
            title={`Current theme: ${getLabel()}. Click to cycle through themes.`}
            type="button"
        >
            <span className="theme-toggle-icon">{getIcon()}</span>
            <span className="theme-toggle-label">{getLabel()}</span>
        </button>
    );
}

export default ThemeProvider;
