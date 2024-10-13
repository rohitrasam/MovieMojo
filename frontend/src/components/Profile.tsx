// src/components/Profile.tsx

import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const Profile: React.FC = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Example user data (you can fetch this from a backend or state)
  const userInfo = {
    name: "satyajit",
    mobile: "7620528355",
    email: "satya96@gamil.com"
  };

  // Handle change password button click
  const handleChangePasswordClick = () => {
    setShowPasswordFields(true);
  };

  // Handle password change logic
  const handlePasswordSubmit = () => {
    if (newPassword === confirmPassword) {
      console.log('Password updated successfully!');
      // Logic for updating password goes here
    } else {
      console.error('Passwords do not match!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Profile Information Text */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#4caf50',
          marginBottom: '20px',
        }}
      >
        Profile Information
      </Typography>

      <Typography variant="h6" gutterBottom>
        Name: {userInfo.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Mobile: {userInfo.mobile}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email: {userInfo.email}
      </Typography>

      {/* Change Password Button */}
      {!showPasswordFields && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleChangePasswordClick}
        >
          Change Password
        </Button>
      )}

      {/* Password Fields */}
      {showPasswordFields && (
        <Box sx={{ mt: 4, width: '100%', maxWidth: '400px' }}>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handlePasswordSubmit}
          >
            Submit Password
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
