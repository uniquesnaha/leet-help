import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    notesCount: 0,
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser({
          username: response.data.username,
          email: response.data.email,
          notesCount: response.data.notes_count,
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("New passwords don't match!");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put('/users/me/password', {
        current_password: password.current,
        new_password: password.new,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Password changed successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
      alert('Failed to change password.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6">User Information</Typography>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Total Notes: {user.notesCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6">Change Password</Typography>
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                type="password"
                name="current"
                label="Current Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password.current}
                onChange={handlePasswordChange}
              />
              <TextField
                type="password"
                name="new"
                label="New Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password.new}
                onChange={handlePasswordChange}
              />
              <TextField
                type="password"
                name="confirm"
                label="Confirm New Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password.confirm}
                onChange={handlePasswordChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Change Password
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
