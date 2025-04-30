import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Rustic brown
      light: '#A0522D',
      dark: '#6B3410',
    },
    secondary: {
      main: '#DEB887', // Burlywood (warm beige)
      light: '#E8C39E',
      dark: '#C19A6B',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#CD853F',
    },
    success: {
      main: '#8B4513',
    },
    background: {
      default: '#FFF8DC', // Light cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#8B4513',
      secondary: '#A0522D',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#8B4513',
    },
    h2: {
      fontWeight: 600,
      color: '#8B4513',
    },
    h3: {
      fontWeight: 600,
      color: '#8B4513',
    },
    h4: {
      fontWeight: 600,
      color: '#8B4513',
    },
    h5: {
      fontWeight: 500,
      color: '#8B4513',
    },
    h6: {
      fontWeight: 500,
      color: '#8B4513',
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      fontWeight: 500,
      color: '#A0522D',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 500,
      color: '#A0522D',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#8B4513',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
      color: '#A0522D',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
          color: '#FFF8DC',
          '&:hover': {
            background: 'linear-gradient(45deg, #6B3410 30%, #8B4513 90%)',
          },
        },
        outlined: {
          borderColor: '#8B4513',
          color: '#8B4513',
          '&:hover': {
            borderColor: '#6B3410',
            backgroundColor: 'rgba(139, 69, 19, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(139, 69, 19, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#DEB887',
          boxShadow: '0 2px 8px rgba(139, 69, 19, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme; 