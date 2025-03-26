import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Badge, IconButton, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState, useContext } from 'react';
import { ColorModeContext } from '../../context/ThemeContext';

function Header({ onLogout }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications] = useState([
    { id: 1, text: 'New project update available' },
    { id: 2, text: 'Meeting scheduled for tomorrow' },
    { id: 3, text: 'New user registration' }
  ]);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  return (
    <AppBar position="fixed" sx={{ 
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#333'}`,
      zIndex: (theme) => theme.zIndex.drawer + 1,
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)'
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ 
          color: 'primary.main', 
          fontWeight: 600,
          cursor: 'pointer' 
        }} onClick={() => navigate('/')}>
          Admin Panel
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 2 }}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Button 
          startIcon={<SettingsIcon />}
          onClick={() => navigate('/settings')} 
          sx={{ 
            color: theme.palette.text.primary,
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'light' ? '#e9ecef' : 'rgba(255, 255, 255, 0.08)' 
            } 
          }}
        >
          Settings
        </Button>
        <Button 
          startIcon={<PersonIcon />}
          onClick={() => navigate('/profile')} 
          sx={{ 
            color: theme.palette.text.primary,
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'light' ? '#e9ecef' : 'rgba(255, 255, 255, 0.08)' 
            } 
          }}
        >
          Profile
        </Button>
        <IconButton
          onClick={handleNotificationClick}
          sx={{ 
            mx: 1, 
            color: theme.palette.text.primary,
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'light' ? '#e9ecef' : 'rgba(255, 255, 255, 0.08)' 
            } 
          }}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: { width: 320, maxHeight: 400 }
          }}
        >
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleNotificationClose}>
              {notification.text}
            </MenuItem>
          ))}
          {notifications.length === 0 && (
            <MenuItem disabled>No new notifications</MenuItem>
          )}
        </Menu>
        <Button 
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{ 
            color: theme.palette.text.primary,
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'light' ? '#e9ecef' : 'rgba(255, 255, 255, 0.08)' 
            } 
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;