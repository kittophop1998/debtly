// Main theme exports
export { ThemeProvider, useTheme, ThemeToggle, LocaleToggle } from '../contexts/theme';
export {
  useThemeColors,
  useTypography,
  useSpacing,
  useBorderRadius,
  useShadows,
  useBreakpoints,
  useThemeUtils,
  createThemeStyles,
  getContrastColor,
  generateCSSVariables,
} from './hooks';

// Theme configurations
export {
  themes,
  lightTheme,
  darkTheme,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
} from './index';

export type { ThemeMode } from './index';

// Convenience re-exports
export { ConfigProvider } from 'antd';
export type { ThemeConfig } from 'antd';