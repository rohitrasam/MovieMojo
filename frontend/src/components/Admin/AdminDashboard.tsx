import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Grid,  } from "@mui/material";
import AdminBar from "./AdminBar";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalTheatres, setTotalTheatres] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScreens, setTotalScreens] = useState(0);
  const [totalShows, setTotalShows] = useState(0);

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
        const response = await axios.get('http://localhost:8000/user/total_users');
        setTotalUsers(response.data.total_users);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total Users:", error);
      }
    };
    fetchTotalUsers();

    const fetchTotalScreens = async () => {
      try {
        const response = await axios.get('http://localhost:8000/screen/get_total_screens');
        setTotalScreens(response.data.total_screens);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total Users:", error);
      }
    };
    fetchTotalScreens();

    const fetchTotalShows = async () => {
      try {
        const response = await axios.get('http://localhost:8000/show/get_total_shows');
        setTotalShows(response.data.total_shows);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total Users:", error);
      }
    };
    fetchTotalShows();
  }, []);



  return (
    <div className="container-scroller" >
      <div className="container-fluid page-body-wrapper">
        <AdminBar />
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
                    <Typography variant="h4">{totalShows}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Screens
                    </Typography>
                    <Typography variant="h4">{totalScreens}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Bookings
                    </Typography>
                    {/* <Typography variant="h4">{totalBookings}</Typography> */}
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
