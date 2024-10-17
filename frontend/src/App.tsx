import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/UserLogin/Login";
import Forgotpass from "./components/UserLogin/Forgotpass";
import Home from './components/Home';
import MovieDetail from './components/MovieDetail'; // Import MovieDetail
import Profile from './components/Profile'; // Import Profile
import AddMovie from './components/Admin/AddMovie';
import AddTheatres from './components/Admin/AddTheatres';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageMovie from './components/Admin/ManageMovie';
import ManageTheatre from './components/Admin/ManageTheatre';
import ViewMovies from './components/Admin/ViewMovies';
import SelectSeat from './components/SelectSeat';  // Import SelectSeat for seat selection
import ViewTheatres from './components/Admin/ViewTheatres';

const App: React.FC = () => {
  return (
    <>
    <ThemeProvider theme={lightTheme}>
    {/* <CssBaseline /> */}
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />  {/* Login Page */}
              <Route path="/forgotpass" element={<Forgotpass />} />  {/* Forgot Password Page */}
              <Route path="/home" element={<Home />} />  {/* Home Page */}
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route */}
              <Route path="/movie/:id/select-seat" element={<SelectSeat />} /> {/* Seat Selection route */}
              <Route path="/admindashboard" element={<AdminDashboard />} />  {/* Admin Dashboard */}
              <Route path="/addtheatres" element={<AddTheatres />} />  {/* Add Theatres */}
              <Route path="/addmovie" element={<AddMovie />} />  {/* Add Movie */}
              <Route path="/viewmovies" element={<ViewMovies />} />  {/* View Movies */}
              <Route path="/managemovies" element={<ManageMovie />} />  {/* Manage Movies */}
              <Route path="/managetheatres" element={<ManageTheatre />} />  {/* Manage Theatres */}
              <Route path="/profile" element={<Profile />} />  {/* Profile route */}
        
              <Route path="/viewtheatres" element={<ViewTheatres />} />  
              <Route path="/login" element={<Login />} /> 
              
              
              
            </Routes>
          </Router>
    </ThemeProvider>
      </>
  );
};

export default App;
