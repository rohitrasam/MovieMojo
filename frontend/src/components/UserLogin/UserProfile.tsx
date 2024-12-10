
import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, List, ListItem, ListItemText, Divider, Box, Alert, CircularProgress, Grid } from "@mui/material";
import axios from 'axios';

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

  useEffect(() => {
    const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
  
      if (user && user.fullName) {
        setUsername(user.fullName);  // Set the user's first_name here
        setLoading(false);
      } else {
        throw new Error("User not logged in or missing details.");
      }

        const bookingsResponse = await axios.get(""); 
        setBookings(bookingsResponse.data); 
        setLoading(false); 

    } catch (error) {
      console.error("Error loading user details:", error);
      setErrorMessage("Failed to load user details.");
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

  return (
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
          <Box component="form" sx={{ marginBottom: "20px" }}>
            <Grid container spacing={1}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: "10px", marginTop:"10px"}}>
            User Profile
           </Typography>

              <Grid item xs={12}>
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
                      onChange={(e) => setEmail(e.target.value)}
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
                  {bookings.map((booking, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={`Movie: ${booking.movieName}`}
                          secondary={`Date: ${booking.date}, Seats: ${booking.seats.join(", ")}`}
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
          </Box>
         
        </>
      )}
    </Box>
  );
};

export default UserProfile;