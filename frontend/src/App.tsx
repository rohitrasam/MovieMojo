import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/UserLogin/Login";
import Forgotpass from "./components/UserLogin/Forgotpass";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import Profile from "./components/Profile";

import AdminDashboard from "./components/Admin/AdminDashboard";
import AddMovie from "./components/Admin/AddMovie";
import ManageMovie from "./components/Admin/ManageMovie";
import SelectSeat from "./components/SeatSelection"; // Import SelectSeat for seat selection
import ViewTheatres from "./components/Admin/ViewTheatres";
import AddScreens from "./components/Admin/AddScreens";
import AddShows from "./components/Admin/AddShows";
import ManageShow from "./components/Admin/ManageShow";
import ManageSeats from "./components/Admin/ManageSeats";
import ManageScreens from "./components/Admin/ManageScreens";
import UserProfile from "./components/UserLogin/UserProfile";
import AddTheatres from "./components/Admin/AddTheatres";
import SelectionFormat from "./components/SelectionFormat";
import ViewBookings from "./components/Admin/ViewBookings";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />  {/* Login Page */}
              <Route path="/login" element={<Login />} /> {/* Login */}
              <Route path="/forgotpass" element={<Forgotpass />} />  {/* Forgot Password Page */}
              <Route path="/home" element={<Home />} />  {/* Home Page */}
              <Route path="/profile" element={<UserProfile />} />  {/* Home Page */}
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route */}
              <Route path="/seat-selection/:screenId" element={<SelectSeat />} />
              <Route path="/movie/:name/selection-format" element={<SelectionFormat />}/>
              <Route path="/admindashboard" element={<AdminDashboard />} />{/* Admin Dashboard */}
              <Route path="/addtheatres" element={<AddTheatres />} />  {/* Add Theatres */}
              <Route path="/addmovie" element={<AddMovie />} />  {/* Add Movie */}
              <Route path="/managemovies" element={<ManageMovie />} />  {/* Manage Movies */}
              <Route path="/profile" element={<Profile />} />  {/* Profile route */}
              <Route path="/viewtheatres" element={<ViewTheatres />} />  {/* View Theatres */}    
              <Route path="/addscreens" element={<AddScreens/>} /> {/* Add Screen */}
              <Route path="/manageseats" element={<ManageSeats/>} /> {/* Manage Seats */}
              <Route path="/managescreens" element={<ManageScreens/>} /> {/* Manage Screens */}
              <Route path="/addshow" element={<AddShows/>} /> {/* Add Shows */}
              <Route path="/manageshow" element={<ManageShow/>} /> {/* Manage Shows */}
              <Route path="/viewbookings" element={<ViewBookings/>} />   {/* View Bookings */}                
            </Routes>
          </Router>
    </ThemeProvider>
  );
};

export default App;
