import React from "react";
import Login from "./components/UserLogin/Login";
import Forgotpass from "./components/UserLogin/Forgotpass";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddTheatres from "./components/Admin/AddTheatres";
import AddMovie from "./components/Admin/AddMovie";
import ViewMovies from "./components/Admin/ViewMovies";
import ManageMovie from "./components/Admin/ManageMovie";
import ManageTheatre from "./components/Admin/ManageTheatre";


function App() {
    return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpass" element={<Forgotpass />} /> 
        <Route path="/home" element={<Home />} /> 
         <Route path="/admindashboard" element={<AdminDashboard />} />
         <Route path="/addtheatres" element={<AddTheatres />} />
         <Route path="/addmovie" element={<AddMovie />} />      
         <Route path="/viewmovies" element={<ViewMovies />} />  
         <Route path="/managemovies" element={<ManageMovie />} /> 
         <Route path="/managetheatres" element={<ManageTheatre />} />      
      </Routes>
    </BrowserRouter>
    </>
   );

}

export default App;