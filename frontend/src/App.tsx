import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/UserLogin/Login";
import Forgotpass from "./components/UserLogin/Forgotpass";
import Home from './components/Home';
import MovieDetail from './components/MovieDetail'; // Import MovieDetail
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, padding: 3 }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route */}
            </Routes>
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
