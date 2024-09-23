import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(13, 67, 137);', // Light green
    },
    secondary: {
      main: 'rgb(13, 67, 137);', // Lighter green
    },
    background: {
      default: 'rgba(12, 191, 207, 0.371)', // Light green background
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgb(13, 67, 137);', // Darker green
      secondary: 'rgb(13, 67, 137);',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50', // Darker green for primary
    },
    secondary: {
      main: '#81C784', // Lighter green for secondary
    },
    background: {
      default: '#303030', // Dark background
      paper: '#424242',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#BDBDBD',
    },
  },
});

export { lightTheme, darkTheme };
