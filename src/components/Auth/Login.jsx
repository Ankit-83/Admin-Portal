import { useState } from 'react';
import { Box, Card, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login validation
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => {
        const storedEmailParts = u.emailParts;
        const fullEmail = storedEmailParts.username + storedEmailParts.domain;
        return fullEmail === email && u.password === password;
      });
      
      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', email);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Signup validation
      if (!email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid email address');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Split email into parts
      const [username, domain] = email.split('@');
      const emailParts = {
        username: username,
        domain: '@' + domain
      };

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(user => (user.emailParts.username + user.emailParts.domain) === email)) {
        setError('Email already registered');
        return;
      }
      
      // Store new user with split email
      users.push({ emailParts, password });
      localStorage.setItem('users', JSON.stringify(users));
      setIsLogin(true);
      setError('');
      setEmail('');
      setPassword('');
      navigate('/login');
    }
  };

  // Update the Link handler
  const handleAuthToggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    navigate(isLogin ? '/signup' : '/login');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <Card sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Typography textAlign="center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            component="button"
            onClick={handleAuthToggle}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;