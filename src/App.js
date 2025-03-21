import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout/Layout';
import Users from './pages/Users';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { ThemeContextProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
