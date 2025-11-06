import { createTheme } from '@mui/material/styles';

// Vercel-inspired dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007aff', // A vibrant blue for primary actions
    },
    secondary: {
      main: '#f8f8f8',
    },
    background: {
      default: '#121212', // A slightly softer black
      paper: '#1e1e1e',   // A lighter grey for cards/surfaces
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0', // A lighter grey for secondary text
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
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#005ecb',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 18, 18, 0.8)', // Semi-transparent for a modern feel
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
