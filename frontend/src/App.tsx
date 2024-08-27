import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
//import MovieDetail from './pages/MovieDetail';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              MovieMojo
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, padding: 3 }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/movie/:id" element={<MovieDetail />} /> */}
              {/* <Route path="/payment" element={<Payment />} /> Add payment route */}
            </Routes>
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
