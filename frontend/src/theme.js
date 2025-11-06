import { createTheme } from '@mui/material/styles';

// Vercel-inspired dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Bright white for primary actions
    },
    secondary: {
      main: '#f8f8f8',
    },
    background: {
      default: '#000000', // Black background
      paper: '#111111',   // Slightly lighter for cards/surfaces
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888', // Grey for secondary text
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: '#ffffff',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
        containedSecondary: {
            backgroundColor: '#222222',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            },
          },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17, 17, 17, 0.8)', // Semi-transparent for a modern feel
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid #333333',
        },
      },
    },
    MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            border: '1px solid #333333',
          },
        },
      },
  },
});
