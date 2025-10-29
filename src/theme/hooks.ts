'use client';

import { colors, typography, spacing, borderRadius, shadows, breakpoints } from './index';
import { useTheme } from '../../app/providers/ThemeProvider';

// Hook for accessing theme colors
export const useThemeColors = () => {
  const { actualTheme } = useTheme();
  
  return {
    colors,
    mode: actualTheme,
    // Helper functions for theme-aware colors
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    neutral: colors.neutral,
    
    // Current theme colors based on mode
    bg: {
      base: actualTheme === 'dark' ? colors.neutral[900] : colors.neutral[50],
      container: actualTheme === 'dark' ? colors.neutral[800] : '#ffffff',
      elevated: actualTheme === 'dark' ? colors.neutral[800] : '#ffffff',
    },
    text: {
      primary: actualTheme === 'dark' ? colors.neutral[100] : colors.neutral[900],
      secondary: actualTheme === 'dark' ? colors.neutral[300] : colors.neutral[600],
      tertiary: actualTheme === 'dark' ? colors.neutral[500] : colors.neutral[400],
    },
    border: {
      primary: actualTheme === 'dark' ? colors.neutral[700] : colors.neutral[200],
      secondary: actualTheme === 'dark' ? colors.neutral[800] : colors.neutral[100],
    },
  };
};

// Hook for accessing typography scale
export const useTypography = () => {
  return {
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    fontWeight: typography.fontWeight,
    
    // Helper functions for consistent typography
    heading: {
      h1: {
        fontSize: typography.fontSize['5xl'],
        lineHeight: typography.lineHeight.tight,
        fontWeight: typography.fontWeight.bold,
      },
      h2: {
        fontSize: typography.fontSize['4xl'],
        lineHeight: typography.lineHeight.tight,
        fontWeight: typography.fontWeight.bold,
      },
      h3: {
        fontSize: typography.fontSize['3xl'],
        lineHeight: typography.lineHeight.tight,
        fontWeight: typography.fontWeight.semibold,
      },
      h4: {
        fontSize: typography.fontSize['2xl'],
        lineHeight: typography.lineHeight.tight,
        fontWeight: typography.fontWeight.semibold,
      },
      h5: {
        fontSize: typography.fontSize.xl,
        lineHeight: typography.lineHeight.tight,
        fontWeight: typography.fontWeight.medium,
      },
      h6: {
        fontSize: typography.fontSize.lg,
        lineHeight: typography.lineHeight.tight,
        fontWeight: typography.fontWeight.medium,
      },
    },
    body: {
      large: {
        fontSize: typography.fontSize.lg,
        lineHeight: typography.lineHeight.relaxed,
        fontWeight: typography.fontWeight.normal,
      },
      base: {
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.normal,
        fontWeight: typography.fontWeight.normal,
      },
      small: {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.normal,
        fontWeight: typography.fontWeight.normal,
      },
      xs: {
        fontSize: typography.fontSize.xs,
        lineHeight: typography.lineHeight.normal,
        fontWeight: typography.fontWeight.normal,
      },
    },
  };
};

// Hook for accessing spacing scale
export const useSpacing = () => {
  return {
    spacing,
    
    // Helper functions for consistent spacing
    padding: {
      none: spacing[0],
      xs: spacing[1],
      sm: spacing[2],
      md: spacing[4],
      lg: spacing[6],
      xl: spacing[8],
      '2xl': spacing[12],
      '3xl': spacing[16],
    },
    margin: {
      none: spacing[0],
      xs: spacing[1],
      sm: spacing[2],
      md: spacing[4],
      lg: spacing[6],
      xl: spacing[8],
      '2xl': spacing[12],
      '3xl': spacing[16],
    },
    gap: {
      none: spacing[0],
      xs: spacing[1],
      sm: spacing[2],
      md: spacing[4],
      lg: spacing[6],
      xl: spacing[8],
      '2xl': spacing[12],
    },
  };
};

// Hook for accessing border radius scale
export const useBorderRadius = () => {
  return {
    borderRadius,
    
    // Helper functions for consistent border radius
    component: {
      small: borderRadius.sm,
      default: borderRadius.md,
      large: borderRadius.lg,
      card: borderRadius.lg,
      modal: borderRadius.xl,
      button: borderRadius.md,
      input: borderRadius.md,
      badge: borderRadius.full,
      avatar: borderRadius.full,
    },
  };
};

// Hook for accessing shadow scale
export const useShadows = () => {
  return {
    shadows,
    
    // Helper functions for consistent shadows
    component: {
      card: shadows.sm,
      cardHover: shadows.md,
      modal: shadows.lg,
      dropdown: shadows.lg,
      tooltip: shadows.md,
      floating: shadows.xl,
    },
  };
};

// Hook for responsive breakpoints
export const useBreakpoints = () => {
  return {
    breakpoints,
    
    // Helper functions for responsive design
    above: (size: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[size]}px)`,
    below: (size: keyof typeof breakpoints) => `@media (max-width: ${breakpoints[size] - 1}px)`,
    between: (min: keyof typeof breakpoints, max: keyof typeof breakpoints) => 
      `@media (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`,
  };
};

// Utility function to create theme-aware styles
export const createThemeStyles = (styles: {
  light: Record<string, any>;
  dark: Record<string, any>;
}) => {
  return (themeMode: 'light' | 'dark') => styles[themeMode];
};

// Utility function to get contrast color
export const getContrastColor = (backgroundColor: string, themeMode: 'light' | 'dark') => {
  // Simple contrast calculation - can be enhanced with more sophisticated logic
  const lightText = colors.neutral[100];
  const darkText = colors.neutral[900];
  
  // For now, return based on theme mode and some basic logic
  if (themeMode === 'dark') {
    return lightText;
  }
  return darkText;
};

// Utility function to generate CSS variables
export const generateCSSVariables = (themeMode: 'light' | 'dark') => {
  const themeColors = themeMode === 'dark' ? {
    bg: colors.neutral[900],
    bgContainer: colors.neutral[800],
    text: colors.neutral[100],
    textSecondary: colors.neutral[300],
    border: colors.neutral[700],
  } : {
    bg: colors.neutral[50],
    bgContainer: '#ffffff',
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    border: colors.neutral[200],
  };

  return {
    '--theme-bg': themeColors.bg,
    '--theme-bg-container': themeColors.bgContainer,
    '--theme-text': themeColors.text,
    '--theme-text-secondary': themeColors.textSecondary,
    '--theme-border': themeColors.border,
    '--theme-primary': colors.primary[500],
    '--theme-success': colors.success[500],
    '--theme-warning': colors.warning[500],
    '--theme-error': colors.error[500],
    '--theme-radius': `${borderRadius.md}px`,
    '--theme-shadow': shadows.sm,
  };
};

// Hook to get all theme utilities
export const useThemeUtils = () => {
  const { themeMode, actualTheme } = useTheme();
  
  return {
    themeMode,
    actualTheme,
    colors: useThemeColors(),
    typography: useTypography(),
    spacing: useSpacing(),
    borderRadius: useBorderRadius(),
    shadows: useShadows(),
    breakpoints: useBreakpoints(),
    cssVariables: generateCSSVariables(actualTheme),
    getContrastColor: (bg: string) => getContrastColor(bg, actualTheme),
    createStyles: createThemeStyles,
  };
};