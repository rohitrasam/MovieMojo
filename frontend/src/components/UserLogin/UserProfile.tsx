
import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, List, ListItem, ListItemText, Divider, Box, Alert, CircularProgress, 
  Grid, Link, Container } from "@mui/material";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true); 
  const [isPasswordChanging, setIsPasswordChanging] = useState(false); 
  const [showBookings, setShowBookings] = useState(false); 
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user && user.fullName) {
        setUsername(user.fullName);  
        setEmail(user.email)
        setLoading(false);
      } else {
        throw new Error("User not logged in or missing details.");
      }

        const bookingsResponse = await axios.get(`http://localhost:8000/show/get_user_booking/${user.id}`); 
        setBookings(bookingsResponse.data); 
        console.log(bookingsResponse.data);
        
        setLoading(false); 

    } catch (error) {
      console.error("Error loading user bookings:", error);
      setErrorMessage("Failed to load user bookings.");
      setLoading(false);
    }
  };  fetchData();
},[]);
 
const handleChangePassword = async () => {
    if (!password) {
      setErrorMessage("Please enter a new password.");
      return;
    }
  
    try {
     axios.patch("http://localhost:8000/user/reset_password", { 
        email:email,
        password:password
      }); 
      setSuccessMessage("Password updated successfully.");
      setEmail("");
      setPassword(""); 
      setIsPasswordChanging(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Failed to update password.");
    }
  };
    
  const handleCancelChangePassword = () => {
    setIsPasswordChanging(false); 
    setEmail("")
    setPassword(""); 
  };

  const handleDashboard = () => {
    navigate("/home"); 
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
    <Box
      sx={{
        padding: "20px",
        maxWidth: "450px", 
        margin: "0 auto",
        minHeight: "80vh", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", 
        overflowY: "auto",
        alignContents:"center"
      }}
    >
      {successMessage && <Alert severity="success" sx={{ marginBottom: "20px" }}>{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ marginBottom: "20px" }}>{errorMessage}</Alert>}
      {loading ? (
        <CircularProgress sx={{ marginBottom: "20px" }} />
      ) : (
        <>
          <Box component="form" sx={{ marginBottom: "20px"}}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{marginBottom: "10px", marginTop:"10px"}}>
                User Profile
              </Typography>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  disabled
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
              <Grid item xs={12}>
                {!isPasswordChanging ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsPasswordChanging(true)}
                    sx={{ width: "100%" }}
                  >
                    Change Password
                  </Button>
                ) : (
                  <>
                  <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ marginBottom: "10px" }}
                    />
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangePassword}
                        sx={{ flex: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelChangePassword}
                        sx={{ flex: 1 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
            <Box sx={{width:"100%", marginTop: "40px" , marginBottom:"40px"}}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowBookings(!showBookings)}
              sx={{ width: "100%" }}
            >
              {showBookings ? "Hide Bookings" : "View Previous Bookings"}
            </Button>
          </Box>

          {showBookings && (
            <Box sx={{ marginBottom: "40px" }}>
              {bookings.length > 0 ? (
                <List>
                  {bookings.map((bookings, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText sx={{width: "200px", marginRight: "9px" }}
                          primary={`Movie: ${bookings.show}`}
                          secondary={`Date: ${bookings.time} `}   
                        />
                        <ListItemText sx={{ marginTop: "5px" }}
                          primary={`Seat:${bookings.seat.seat_num}`}
                          secondary={`${bookings.screen}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No bookings found.
                </Typography>
              )}
            </Box>
          )}
              <Box sx={{ display: "flex", gap: "10px", marginTop: "20px", marginBottom:"40px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDashboard}
                sx={{ flex: 1 }}
              >
                Dashboard
              </Button>
            </Box>
          </Box>
          </>
      )}
          </Box>
          </Container>
  );
};

export default UserProfile;
