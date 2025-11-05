import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AddEntryPage from './pages/AddEntryPage';
import CodexVaultPage from './pages/CodexVaultPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/add-entry" element={<AddEntryPage />} />
        <Route path="/vault" element={<CodexVaultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
