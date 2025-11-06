import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme';
import MainLayout from './components/MainLayout';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const AddEntryPage = React.lazy(() => import('./pages/AddEntryPage'));
const CodexVaultPage = React.lazy(() => import('./pages/CodexVaultPage'));
const ViewEntryPage = React.lazy(() => import('./pages/ViewEntryPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

// A simple placeholder for checking authentication status
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// A wrapper for protected routes
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /login page if they are not logged in
    return <Navigate to="/login" replace />;
  }
  return children;
};

// A wrapper for public routes
const PublicRoute = ({ children }) => {
	if (isAuthenticated()) {
		// Redirect them to the home page if they are already logged in
		return <Navigate to="/" replace />;
	}
	return children;
}

// Component to handle layout and routing logic
const AppContent = () => {
  return (
    <Routes>
      {/* Auth page is public */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

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
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
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
        <Suspense fallback={<div>Loading...</div>}>
          <AppContent />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
