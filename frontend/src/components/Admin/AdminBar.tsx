import { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

import "./AdminDashboard.css";

const AdminBar=()=>{
  const [isTheatresOpen, setTheatresOpen] = useState(false);
  const [isMoviesOpen, setMoviesOpen] = useState(false);
  const [isUsersOpen,setUsersOpen] =useState(false);

  const toggleTheatres = () => setTheatresOpen(!isTheatresOpen);
  const toggleMovies = () => setMoviesOpen(!isMoviesOpen);
  const toggleUsers = () => setUsersOpen(!isUsersOpen);
    const[adminName,setAdminName]=useState('');

    useEffect(()=>{
        const fetchAdminData =async () =>{
            try{
                const response=await axios.get('');
                setAdminName(response.data.name);
            }
            catch(error){
                console.error("error fetching data",error);
            }
        };
        fetchAdminData();
    },[]);

    return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ backgroundColor: '#0d76a7' }}>
      <ul className="nav">
        <li className="nav-item nav-profile">
          <div className="nav-link">
            <div className="text-wrapper">
              <h4>Welcome {adminName}</h4>
            </div>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">Dashboard</span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">Dashboard</span>
            <i className="icon-screen-desktop menu-icon"></i>
          </Link>
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={toggleTheatres}>
            <span className="menu-title">Theatres</span>
          </a>
          {isTheatresOpen &&(
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> 
                 <Link className="nav-link" to="/addtheatres">Add Theatres</Link>
                </li>
              <li className="nav-item"> 
                <Link className="nav-link" to="/managetheatres">Manage Theatres</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={toggleMovies}>
            <span className="menu-title">Movies</span>
          </a>
          {isMoviesOpen && (
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> 
                <Link className="nav-link" to="/addmovie">Add Movies</Link>
                </li>
              <li className="nav-item"> 
                <Link className="nav-link" to="/managemovies">Manage Movies</Link>
                </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <a className="nav-link" onClick={toggleUsers}>
            <span className="menu-title">Users</span>
          </a>
          {isUsersOpen &&( 
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> 
                <Link className="nav-link" to="/add-user">Add Users</Link>
                </li>
              <li className="nav-item"> 
                <Link className="nav-link" to="/manage-user">Manage Users</Link>
                </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            <span className="menu-title">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminBar;


