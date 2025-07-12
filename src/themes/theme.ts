import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF6B35', // Orange - food theme
    secondary: '#4ECDC4', // Teal
    tertiary: '#45B7D1', // Blue
    background: '#FFFFFF',
    surface: '#F8F9FA',
    error: '#FF5252',
    warning: '#FF9800',
    success: '#4CAF50',
    info: '#2196F3',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#212121',
    onSurface: '#212121',
    onError: '#FFFFFF',
    // Custom colors for Food Buddy
    food: {
      primary: '#FF6B35',
      secondary: '#4ECDC4',
      accent: '#FFE66D', // Yellow
      dark: '#2C3E50',
      light: '#ECF0F1',
      success: '#27AE60',
      warning: '#F39C12',
      error: '#E74C3C',
    },
    // Price tier colors
    price: {
      budget: '#4CAF50',
      moderate: '#FF9800',
      expensive: '#F44336',
      luxury: '#9C27B0',
    },
    // Rating colors
    rating: {
      excellent: '#FFD700',
      good: '#FFA500',
      average: '#FF8C00',
      poor: '#FF4500',
    },
  },
  fonts: {
    ...MD3LightTheme.fonts,
    // Custom font weights
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700' as const,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 10,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.32,
      elevation: 15,
    },
  },
};