import { ThemeConfig } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

// Brand Colors - Trust & Safety Green-Blue Palette
export const COLORS = {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Main primary color - Teal for trust & safety
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Light blue for secondary elements
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Emerald green for success
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0', 
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Slate gray with blue undertones
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

// Spacing Scale
export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
} as const;

// Border Radius
export const BORDER_RADIUS = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

// Light Theme Configuration
export const lightTheme: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: COLORS.primary[500],
    colorSuccess: COLORS.success[500],
    colorWarning: COLORS.warning[500],
    colorError: COLORS.error[500],
    colorInfo: COLORS.primary[500],
    
    // Background Colors
    colorBgBase: COLORS.neutral[50],
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: COLORS.neutral[50],
    colorBgSpotlight: COLORS.neutral[100],
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    
    // Text Colors
    colorText: COLORS.neutral[900],
    colorTextSecondary: COLORS.neutral[600],
    colorTextTertiary: COLORS.neutral[400],
    colorTextQuaternary: COLORS.neutral[300],
    
    // Border Colors
    colorBorder: COLORS.neutral[200],
    colorBorderSecondary: COLORS.neutral[100],
    
    // Typography
    fontSize: TYPOGRAPHY.fontSize.base,
    fontSizeSM: TYPOGRAPHY.fontSize.sm,
    fontSizeLG: TYPOGRAPHY.fontSize.lg,
    fontSizeXL: TYPOGRAPHY.fontSize.xl,
    fontSizeHeading1: TYPOGRAPHY.fontSize['5xl'],
    fontSizeHeading2: TYPOGRAPHY.fontSize['4xl'],
    fontSizeHeading3: TYPOGRAPHY.fontSize['3xl'],
    fontSizeHeading4: TYPOGRAPHY.fontSize['2xl'],
    fontSizeHeading5: TYPOGRAPHY.fontSize.xl,
    
    // Line Height
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    lineHeightSM: TYPOGRAPHY.lineHeight.snug,
    lineHeightLG: TYPOGRAPHY.lineHeight.relaxed,
    lineHeightHeading1: TYPOGRAPHY.lineHeight.tight,
    lineHeightHeading2: TYPOGRAPHY.lineHeight.tight,
    lineHeightHeading3: TYPOGRAPHY.lineHeight.tight,
    lineHeightHeading4: TYPOGRAPHY.lineHeight.tight,
    lineHeightHeading5: TYPOGRAPHY.lineHeight.tight,
    
    // Font Family
    fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    fontFamilyCode: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    
    // Spacing
    padding: SPACING[4],
    paddingSM: SPACING[3],
    paddingLG: SPACING[6],
    paddingXL: SPACING[8],
    paddingXS: SPACING[2],
    
    margin: SPACING[4],
    marginSM: SPACING[3],
    marginLG: SPACING[6],
    marginXL: SPACING[8],
    marginXS: SPACING[2],
    
    // Border Radius
    borderRadius: BORDER_RADIUS.md,
    borderRadiusSM: BORDER_RADIUS.sm,
    borderRadiusLG: BORDER_RADIUS.lg,
    borderRadiusXS: BORDER_RADIUS.base,
    
    // Layout
    sizeStep: 4,
    sizeUnit: 4,
    
    // Control Heights
    controlHeight: 32,
    controlHeightSM: 24,
    controlHeightLG: 40,
    controlHeightXS: 16,
    
    // Z-Index
    zIndexBase: 0,
    zIndexPopupBase: 1000,
    
    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
    
    // Box Shadow
    boxShadow: SHADOWS.base,
    boxShadowSecondary: SHADOWS.sm,
    boxShadowTertiary: SHADOWS.lg,
    
    // Wireframe
    wireframe: false,
  } as Partial<AliasToken>,
  
  components: {
    // Button
    Button: {
      borderRadius: BORDER_RADIUS.md,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      paddingInline: SPACING[4],
      paddingInlineSM: SPACING[3],
      paddingInlineLG: SPACING[6],
    },
    
    // Input
    Input: {
      borderRadius: BORDER_RADIUS.md,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingInline: SPACING[3],
      fontSize: TYPOGRAPHY.fontSize.base,
    },
    
    // Card
    Card: {
      borderRadius: BORDER_RADIUS.lg,
      borderRadiusLG: BORDER_RADIUS.xl,
      boxShadow: SHADOWS.sm,
      boxShadowTertiary: SHADOWS.md,
      paddingLG: SPACING[6],
    },
    
    // Modal
    Modal: {
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING[6],
      paddingLG: SPACING[8],
    },
    
    // Table
    Table: {
      borderRadius: BORDER_RADIUS.md,
      cellPaddingBlock: SPACING[3],
      cellPaddingInline: SPACING[4],
      headerBg: COLORS.neutral[50],
      headerColor: COLORS.neutral[700],
      rowHoverBg: COLORS.neutral[50],
    },
    
    // Dropdown
    Dropdown: {
      borderRadius: BORDER_RADIUS.md,
      boxShadow: SHADOWS.lg,
      padding: SPACING[1],
    },
    
    // Menu
    Menu: {
      borderRadius: BORDER_RADIUS.md,
      itemBorderRadius: BORDER_RADIUS.sm,
      itemPaddingInline: SPACING[3],
      itemHeight: 40,
    },
    
    // Typography
    Typography: {
      titleMarginBottom: SPACING[4],
      titleMarginTop: SPACING[6],
    },
    
    // Form
    Form: {
      itemMarginBottom: SPACING[6],
      verticalLabelPadding: SPACING[2],
    },
    
    // Tabs
    Tabs: {
      borderRadius: BORDER_RADIUS.md,
      cardPadding: `${SPACING[4]}px`,
      horizontalItemPadding: `${SPACING[3]}px ${SPACING[4]}px`,
      verticalItemPadding: `${SPACING[2]}px ${SPACING[6]}px`,
    },
    
    // Tag
    Tag: {
      borderRadius: BORDER_RADIUS.full,
      fontSize: TYPOGRAPHY.fontSize.sm,
    },
    
    // Avatar
    Avatar: {
      borderRadius: BORDER_RADIUS.full,
      containerSize: 32,
      containerSizeLG: 40,
      containerSizeSM: 24,
    },
    
    // Badge
    Badge: {
      borderRadius: BORDER_RADIUS.full,
      fontSize: TYPOGRAPHY.fontSize.xs,
    },
    
    // Progress
    Progress: {
      borderRadius: BORDER_RADIUS.full,
      lineWidth: 8,
    },
    
    // Notification
    Notification: {
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING[4],
      paddingLG: SPACING[6],
    },
    
    // Message
    Message: {
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING[3],
    },
    
    // Divider
    Divider: {
      marginLG: SPACING[6],
      margin: SPACING[4],
    },
    
    // Steps
    Steps: {
      borderRadius: BORDER_RADIUS.full,
      dotSize: 32,
    },
    
    // Breadcrumb
    Breadcrumb: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      itemColor: COLORS.neutral[600],
      lastItemColor: COLORS.neutral[900],
      linkColor: COLORS.primary[600],
      linkHoverColor: COLORS.primary[500],
      separatorColor: COLORS.neutral[400],
    },
  },
};

// Dark Theme Configuration
export const darkTheme: ThemeConfig = {
  ...lightTheme,
  token: {
    ...lightTheme.token,
    
    // Colors adjusted for dark mode
    colorBgBase: COLORS.neutral[900],
    colorBgContainer: COLORS.neutral[800],
    colorBgElevated: COLORS.neutral[800],
    colorBgLayout: COLORS.neutral[900],
    colorBgSpotlight: COLORS.neutral[700],
    colorBgMask: 'rgba(0, 0, 0, 0.65)',
    
    // Text Colors for dark mode
    colorText: COLORS.neutral[100],
    colorTextSecondary: COLORS.neutral[300],
    colorTextTertiary: COLORS.neutral[500],
    colorTextQuaternary: COLORS.neutral[600],
    
    // Border Colors for dark mode
    colorBorder: COLORS.neutral[700],
    colorBorderSecondary: COLORS.neutral[800],
  },
  
  components: {
    ...lightTheme.components,
    
    // Adjust specific components for dark mode
    Table: {
      ...lightTheme.components?.Table,
      headerBg: COLORS.neutral[800],
      headerColor: COLORS.neutral[200],
      rowHoverBg: COLORS.neutral[700],
    },
    
    Breadcrumb: {
      ...lightTheme.components?.Breadcrumb,
      itemColor: COLORS.neutral[400],
      lastItemColor: COLORS.neutral[100],
      separatorColor: COLORS.neutral[600],
    },
  },
};

// Export theme configurations
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeMode = keyof typeof themes;

// Export all constants for use in components
export {
  COLORS as colors,
  TYPOGRAPHY as typography,
  SPACING as spacing,
  BORDER_RADIUS as borderRadius,
  SHADOWS as shadows,
  BREAKPOINTS as breakpoints,
};