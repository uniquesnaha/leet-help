import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Tabs, Tab, Paper, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Clear fields on tab change
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/token', new URLSearchParams({
        username: email,
        password: password,
      }));
      localStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Add user-facing error handling here
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      // Add user-facing error handling here
      return;
    }
    try {
      await axios.post('/auth/register', { email, password });
      // Log in the user after successful registration
      const response = await axios.post('/auth/token', new URLSearchParams({
          username: email,
          password: password,
      }));
      localStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
      // Add user-facing error handling here
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 1 }}>
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <MuiLink href="#" variant="body2" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
              Forgot Password?
            </MuiLink>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
              Login
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 1 }}>
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField margin="normal" required fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AuthPage;
