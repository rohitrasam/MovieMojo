import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminBar from "./AdminBar";
import "./AdminDashboard.css";

const AdminDashboard =() =>{
    const[totalTheatres,setTotalTheatres]=useState(0);
    const[totalMovies,setTotalMovies]=useState(0);
    const[totalUsers,setTotalUsers]=useState(0);

    useEffect(() =>{
        axios.get('')
        .then(response=>{
            setTotalTheatres(response.data.total);
        })
        .catch(error=>console.error("Could not load data",error));

        axios.get('')
        .then(response=>{
            setTotalMovies(response.data.total);
        })
        .catch(error=>console.error("Could not load data",error));

        axios.get('')
        .then(response=>{
            setTotalUsers(response.data.total);
        })
        .catch(error=>console.error("Could not load data",error));
    },[]
);

return(
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <AdminBar />    
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <div className="row report-inner-cards-wrapper">
                      <div className="col-md-6 col-xl report-inner-card">
                        <div className="inner-card-text">
                          <span className="report-title">Total Theatres</span>
                          <h4>{totalTheatres}</h4>
                          <a href=""><span className="report-count">View Theatres</span></a>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl report-inner-card">
                        <div className="inner-card-text">
                          <span className="report-title">Total Movies</span>
                          <h4>{totalMovies}</h4>
                          <a href=""><span className="report-count">View Movies</span></a>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl report-inner-card">
                        <div className="inner-card-text">
                          <span className="report-title">Total Users</span>
                          <h4>{totalUsers}</h4>
                          <a href=""><span className="report-count">View Users</span></a>
                        </div>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>         
          </div>         
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
