import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AddEntryPage from './pages/AddEntryPage';
import CodexVaultPage from './pages/CodexVaultPage';
import ViewEntryPage from './pages/ViewEntryPage'; // Import the new page

// A simple placeholder for checking authentication status
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// A wrapper for protected routes
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /auth page if they are not logged in
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// Component to handle layout and routing logic
const AppContent = () => {
  return (
    <Routes>
      {/* Auth page is public */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Application routes are protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-entry"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AddEntryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/vault"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CodexVaultPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/entry/:entryId" // Add the new route
        element={
          <ProtectedRoute>
            <MainLayout>
              <ViewEntryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Redirect any unknown paths to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
