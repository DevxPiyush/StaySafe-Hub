import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6C5CE7', // Purple for trust and safety
      light: '#A29BFE',
      dark: '#5B4BD1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FD79A8', // Pink for women's safety focus
      light: '#FDCB6E',
      dark: '#E84393',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#00B894', // Green for verified/safe
      light: '#55EFC4',
      dark: '#00A085',
    },
    warning: {
      main: '#FDCB6E', // Orange for caution
      light: '#FFE066',
      dark: '#F39C12',
    },
    error: {
      main: '#E17055', // Red for danger/emergency
      light: '#FF7675',
      dark: '#D63031',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(108, 92, 231, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});
