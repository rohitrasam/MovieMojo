import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Grid,  } from "@mui/material";
import AdminBar from "./AdminBar";
import { Link, useParams } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalTheatres, setTotalTheatres] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { name } = useParams(); // Get the userId from the URL

  useEffect(() => { 
    const fetchTotalMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movies/get_movies');
        setTotalMovies(response.data.length);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total movies:", error);
      }
    };
    fetchTotalMovies();
  }, []);


  useEffect(() => {
    const fetchTotalTheatres = async () => {
      try {
        const response = await axios.get('http://localhost:8000/theatre/get_theatres');
        setTotalTheatres(response.data.length);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total Theatres:", error);
      }
    };
    fetchTotalTheatres();
  }, []);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user');
        setTotalUsers(response.data.length);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total Users:", error);
      }
    };
    fetchTotalUsers();
  }, []);



  return (
    <div className="container-scroller" >
      <div className="container-fluid page-body-wrapper">
        <AdminBar name={name?name : "Admin"} />
        <div className="main-panel" >
          <div className="content-wrapper">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Theatres
                    </Typography>
                    <Typography variant="h4">{totalTheatres}</Typography> 
                    <Link to ="/viewtheatres" className="report-count">
                      View Theatres
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Movies
                    </Typography>
                    <Typography variant="h4">{totalMovies}</Typography>
                    <Link to="/viewmovies" className="report-count">
                      View Movies
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Users
                    </Typography>
                    <Typography variant="h4">{totalUsers}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Shows
                    </Typography>
                    <Typography variant="h4">{totalUsers}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Screens
                    </Typography>
                    <Typography variant="h4">{totalUsers}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Bookings
                    </Typography>
                    <Typography variant="h4">{totalUsers}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
