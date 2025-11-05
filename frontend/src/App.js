import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AddEntryPage from './pages/AddEntryPage';
import CodexVaultPage from './pages/CodexVaultPage';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/add-entry" element={<AddEntryPage />} />
          <Route path="/vault" element={<CodexVaultPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
