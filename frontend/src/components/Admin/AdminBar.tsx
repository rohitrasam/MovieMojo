import {  useState } from 'react'
import {Link} from 'react-router-dom';
import "./AdminDashboard.css";

const AdminBar=()=>{

  const [isTheatresOpen, setTheatresOpen] = useState(false);
  const [isMoviesOpen, setMoviesOpen] = useState(false);
  const [isScreensOpen, setScreensOpen] = useState(false);
  const [isShowTimingsOpen, setShowTimingsOpen] = useState(false);
  const [isBookingsOpen, setBookingsOpen] = useState(false);
  const [isSeatsOpen,setSeatsOpen] = useState(false);

  const toggleTheatres = () => setTheatresOpen(!isTheatresOpen);
  const toggleMovies = () => setMoviesOpen(!isMoviesOpen);
  const toggleScreens = () => setScreensOpen(!isScreensOpen);
  const toggleShowTimings = () => setShowTimingsOpen(!isShowTimingsOpen);
  const toggleBookings = () => setBookingsOpen(!isBookingsOpen);
  const toggleSeats = () => setSeatsOpen(!isSeatsOpen);

    return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ backgroundColor: '#0d76a7' }}>
      <ul className="nav">
        <li className="nav-item nav-profile">
          <div className="nav-link">
            <div className="text-wrapper">
              <h4>Welcome Admin!!</h4>
            </div>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">Dashboard</span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admindashboard">
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
          <a className="nav-link" onClick={toggleScreens}>
            <span className="menu-title">Screens</span>
          </a>
          {isScreensOpen &&(
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> 
                 <Link className="nav-link" to="/addscreens">Add Screens</Link>
                </li>
              <li className="nav-item"> 
                <Link className="nav-link" to="/managescreens">Manage Screens</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={toggleSeats}>
            <span className="menu-title">Seats</span>
          </a>
          {isSeatsOpen &&(
            <ul className="nav flex-column sub-menu">
              {/* <li className="nav-item"> 
                 <Link className="nav-link" to="/addseats">Add Seats</Link>
                </li> */}
              <li className="nav-item"> 
                <Link className="nav-link" to="/manageseats">Manage Seats</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={toggleShowTimings}>
            <span className="menu-title">Show Timings</span>
          </a>
          {isShowTimingsOpen &&(
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> 
                 <Link className="nav-link" to="/addshow">Add Show Timings</Link>
                </li>
              <li className="nav-item"> 
                <Link className="nav-link" to="/managetheatres">Manage Show Timings</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={toggleBookings}>
            <span className="menu-title">Bookings</span>
          </a>
          {isBookingsOpen &&(
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> 
                 <Link className="nav-link" to="/viewbookings">View Bookings</Link>
                </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <span className="menu-title">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminBar;


