import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/UserLogin/Login";
import Forgotpass from "./components/UserLogin/Forgotpass";
import Home from './components/Home';
import MovieDetail from './components/MovieDetail'; 
import AddMovie from './components/Admin/AddMovie';
import AddTheatres from './components/Admin/AddTheatres';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageMovie from './components/Admin/ManageMovie';
import ManageTheatre from './components/Admin/ManageTheatre';
import ViewMovies from './components/Admin/ViewMovies';
import ViewTheatres from './components/Admin/ViewTheatres';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
          <Router>
            <Routes>     
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route */}
              <Route path="/" element={<Login />} />
              <Route path="/forgotpass" element={<Forgotpass />} /> 
              <Route path="/home" element={<Home />} /> 
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/addtheatres" element={<AddTheatres />} />
              <Route path="/addmovie" element={<AddMovie />} />      
              <Route path="/viewmovies" element={<ViewMovies />} /> 
              <Route path="/viewtheatres" element={<ViewTheatres />} />  
              <Route path="/managemovies" element={<ManageMovie />} /> 
              <Route path="/managetheatres" element={<ManageTheatre />} /> 
              <Route path="/login" element={<Login />} /> 
              
              
              
            </Routes>
          </Router>
    </ThemeProvider>
  );
};

export default App;
