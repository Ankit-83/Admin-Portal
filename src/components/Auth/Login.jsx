import { useState } from 'react';
import { Box, Card, TextField, Button, Typography, Link } from '@mui/material';

function Login({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5'
      }}
    >
      <Card sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
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
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;