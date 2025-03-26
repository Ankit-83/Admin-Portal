import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout/Layout';
import Users from './pages/Users';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import { ThemeContextProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function AppContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Layout onLogout={handleLogout}><Dashboard /></Layout>}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="tableview" element={<Dashboard />} />
          </Route>
          <Route path="/users" element={<Layout onLogout={handleLogout}><Users /></Layout>} />
          <Route path="/users/adduser" element={<Layout onLogout={handleLogout}><Users /></Layout>} />
          <Route path="/projects" element={<Layout onLogout={handleLogout}><Projects /></Layout>} />
          <Route path="/analytics" element={<Layout onLogout={handleLogout}><Analytics /></Layout>} />
          <Route path="/settings" element={<Layout onLogout={handleLogout}><Settings /></Layout>} />
          <Route path="/profile" element={<Layout onLogout={handleLogout}><Profile /></Layout>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
