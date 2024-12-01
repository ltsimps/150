import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    error: '#B00020',
    disabled: '#CCCCCC',
    placeholder: '#6B6B6B',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  typography: {
    headingLarge: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    headingMedium: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    bodyLarge: {
      fontSize: 16,
    },
    bodyMedium: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
  },
};
