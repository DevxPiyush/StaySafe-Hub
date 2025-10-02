import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

// Import components (will create these next)
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SearchResults from './pages/SearchResults';
import PropertyDetails from './pages/PropertyDetails';
import BookingFlow from './pages/BookingFlow';
import TenantPortal from './pages/TenantPortal';
import ProfileSetup from './pages/ProfileSetup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/booking/:id" element={<BookingFlow />} />
            <Route path="/tenant" element={<TenantPortal />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
