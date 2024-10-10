import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Link as MUILink } from "@mui/material";
import AdminBar from "./AdminBar";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalMovies, setTotalMovies] = useState(0);

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

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <AdminBar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography variant="h5" component="div" className="report-title">
                      Total Theatres
                    </Typography>
                    {/* <Typography variant="h4">{totalTheatres}</Typography> */}
                    <MUILink href="" className="report-count">
                      View Theatres
                    </MUILink>
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
                    {/* <Typography variant="h4">{totalUsers}</Typography> */}
                    <MUILink href="" className="report-count">
                      View Users
                    </MUILink>
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
