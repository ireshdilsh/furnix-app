/**
 * Furnix App Theme - Modern Gen Z Design
 * Warm, earthy tones with contemporary accent colors
 */

import { Platform } from 'react-native';

// Primary brand colors - Warm & Modern
const primary = '#2D2A26';        // Rich charcoal
const secondary = '#C4A77D';      // Warm gold/tan
const accent = '#E8DED1';         // Soft cream
const highlight = '#FF6B35';      // Vibrant coral/orange (Gen Z pop)

export const Colors = {
  // Brand colors
  primary,
  secondary,
  accent,
  highlight,

  // UI Colors
  background: '#FDFBF7',          // Warm white
  surface: '#FFFFFF',
  surfaceVariant: '#F5F0E8',      // Light warm gray

  // Text colors
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#9B9B9B',
  textLight: '#FFFFFF',

  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Neutral palette
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Category colors (Gen Z palette)
  categoryLiving: '#E8D5B7',
  categoryBedroom: '#D4C4B0',
  categoryOffice: '#B8C4CE',
  categoryOutdoor: '#C5D5C0',
  categoryKitchen: '#E5C8C8',

  light: {
    text: '#1A1A1A',
    background: '#FDFBF7',
    tint: primary,
    icon: '#6B6B6B',
    tabIconDefault: '#9B9B9B',
    tabIconSelected: primary,
  },
  dark: {
    text: '#FDFBF7',
    background: '#1A1A1A',
    tint: secondary,
    icon: '#9B9B9B',
    tabIconDefault: '#6B6B6B',
    tabIconSelected: secondary,
  },
};

// Spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadow styles
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
