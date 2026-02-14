/**
 * Funix Furniture App Theme - Modern Gen Z Design
 * Premium, minimal, trendy, and Instagram-ready aesthetic
 */

import { Platform } from 'react-native';

// ============================================
// 🎨 COLOR PALETTE - Gen Z Style
// ============================================

export const Colors = {
  // Primary Brand Colors
  primary: '#155dfc',         // Soft Purple
  primaryLight: '#A29BFE',    // Light Purple
  secondary: '#A29BFE',       // Secondary Purple
  accent: '#FF7675',          // Coral for CTA
  accentLight: '#FFB4A2',     // Light Coral

  // Background Colors
  backgroundLight: '#F8F9FF', // Light mode background
  backgroundDark: '#0F0F1A',  // Dark mode background

  // Surface Colors
  surface: '#FFFFFF',
  surfaceLight: '#F8F9FF',
  surfaceDark: '#1C1C2E',     // Dark mode card
  cardDark: '#1C1C2E',
  cardLight: '#FFFFFF',

  // Glassmorphism
  glass: 'rgba(255, 255, 255, 0.25)',
  glassDark: 'rgba(28, 28, 46, 0.8)',
  glassLight: 'rgba(255, 255, 255, 0.9)',

  // Text Colors
  textPrimary: '#111111',
  textSecondary: '#666666',
  textMuted: '#999999',
  textLight: '#FFFFFF',
  textDark: '#0F0F1A',

  // Gradient Colors
  gradientPurple: ['#6C5CE7', '#A29BFE'] as const,
  gradientCoral: ['#FF7675', '#FFB4A2'] as const,
  gradientPurpleCoral: ['#2b7fff', '#74d4ff'] as const,
  gradientDark: ['#1C1C2E', '#0F0F1A'] as const,
  gradientGlow: ['rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0)'] as const,

  // Status Colors
  success: '#00C851',
  successLight: '#00E676',
  warning: '#FFB300',
  warningLight: '#FFD54F',
  error: '#FF4444',
  errorLight: '#FF7043',
  info: '#33B5E5',
  infoLight: '#4FC3F7',

  // Neutral Palette
  white: '#FFFFFF',
  black: '#000000',
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

  // Category Colors (Soft Pastels)
  categoryLiving: '#E8D5F0',   // Soft lavender
  categoryBedroom: '#D4E5F7',  // Soft blue
  categoryOffice: '#F0E5D4',   // Soft beige
  categoryOutdoor: '#D4F0E5',  // Soft mint
  categoryKitchen: '#F7D4D4',  // Soft pink
  categoryDining: '#F0F0D4',   // Soft yellow

  // Light Theme
  light: {
    text: '#111111',
    textSecondary: '#666666',
    background: '#F8F9FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    tint: '#6C5CE7',
    icon: '#666666',
    border: '#E0E0E0',
    tabIconDefault: '#999999',
    tabIconSelected: '#6C5CE7',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Dark Theme
  dark: {
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    background: '#0F0F1A',
    surface: '#1C1C2E',
    card: '#1C1C2E',
    tint: '#A29BFE',
    icon: '#AAAAAA',
    border: '#2A2A3E',
    tabIconDefault: '#666666',
    tabIconSelected: '#A29BFE',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

// ============================================
// 📐 SPACING SYSTEM
// ============================================

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// ============================================
// 🔘 BORDER RADIUS
// ============================================

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 9999,
  card: 20,      // Product cards
  button: 16,    // Buttons
  input: 12,     // Input fields
  chip: 20,      // Category chips
  modal: 24,     // Modal sheets
};

// ============================================
// 🌑 SHADOW STYLES
// ============================================

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  floatingButton: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
};

// ============================================
// 🔤 TYPOGRAPHY SYSTEM
// ============================================

export const Typography = {
  // Font Families
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    light: 'Poppins-Light',
  },

  // Font Sizes
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    h3: 22,
    h2: 28,
    h1: 32,
    display: 40,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Pre-defined text styles
export const TextStyles = {
  h1: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.h1,
    lineHeight: Typography.fontSize.h1 * Typography.lineHeight.tight,
  },
  h2: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.h2,
    lineHeight: Typography.fontSize.h2 * Typography.lineHeight.tight,
  },
  h3: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.h3,
    lineHeight: Typography.fontSize.h3 * Typography.lineHeight.tight,
  },
  bodyLarge: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.lg,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
  },
  body: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.normal,
  },
  bodySmall: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
  caption: {
    fontFamily: Typography.fontFamily.light,
    fontSize: Typography.fontSize.xs,
    lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
  },
  button: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    letterSpacing: Typography.letterSpacing.wide,
  },
  price: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
  },
  priceSmall: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
  },
};

// ============================================
// 🎭 ANIMATION CONFIG
// ============================================

export const Animation = {
  // Duration (ms)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
  },

  // Scale values
  scale: {
    pressed: 0.95,
    hover: 1.02,
    bounce: 1.1,
  },
};

// ============================================
// 📱 LAYOUT CONSTANTS
// ============================================

export const Layout = {
  // Screen padding
  screenPadding: Spacing.lg,
  screenPaddingSmall: Spacing.md,

  // Card dimensions
  productCardWidth: 165,
  productCardHeight: 220,
  productImageHeight: 140,

  // Bottom tab
  tabBarHeight: 70,
  tabBarPadding: Spacing.sm,

  // Header
  headerHeight: 60,

  // Button heights
  buttonHeightLarge: 56,
  buttonHeightMedium: 48,
  buttonHeightSmall: 40,

  // Input heights
  inputHeight: 56,

  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,
};

// ============================================
// 🎨 GLASSMORPHISM STYLES
// ============================================

export const Glassmorphism = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
  },
  dark: {
    backgroundColor: 'rgba(28, 28, 46, 0.75)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
};

// ============================================
// 🔧 PLATFORM SPECIFIC FONTS
// ============================================

export const SystemFonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
});

// ============================================
// 📱 EXPORT THEME OBJECT
// ============================================

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  typography: Typography,
  textStyles: TextStyles,
  animation: Animation,
  layout: Layout,
  glassmorphism: Glassmorphism,
};

export default Theme;
