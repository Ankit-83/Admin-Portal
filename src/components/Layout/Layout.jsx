import { Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header setIsAuthenticated={setIsAuthenticated} />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 10, sm: 9 },
          px: 4,
          pb: 3,
          minHeight: '100vh',
          backgroundColor: 'background.default',
          overflow: 'auto',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          '& > *': {
            width: '100%',
            mb: 3
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;