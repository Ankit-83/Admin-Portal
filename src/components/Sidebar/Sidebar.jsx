import { List, ListItem, ListItemIcon, ListItemText, Drawer, useTheme, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FolderIcon from '@mui/icons-material/Folder';

function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  
  const modules = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { name: 'Users', icon: <PersonIcon />, path: '/users' },
    { name: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { name: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { name: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#333'}`,
          mt: '64px',
          height: 'calc(100vh - 64px)',
          position: 'fixed'
        },
      }}
    >
      <List sx={{ p: 2 }}>
        {modules.map((module) => {
          const isSelected = location.pathname === module.path || 
                           (location.pathname === '/' && module.path === '/');
          
          return (
            <ListItem
              button
              component={Link}
              to={module.path}
              key={module.name}
              sx={{
                backgroundColor: isSelected 
                  ? theme.palette.mode === 'light' 
                    ? '#e3f2fd' 
                    : 'rgba(255, 255, 255, 0.08)'
                  : 'transparent',
                borderRight: isSelected 
                  ? `4px solid ${theme.palette.primary.main}` 
                  : 'none',
                '&:hover': {
                  backgroundColor: isSelected 
                    ? theme.palette.mode === 'light'
                      ? '#e3f2fd'
                      : 'rgba(255, 255, 255, 0.08)'
                    : theme.palette.action.hover
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: isSelected 
                  ? theme.palette.primary.main 
                  : theme.palette.text.secondary 
              }}>
                {module.icon}
              </ListItemIcon>
              <ListItemText 
                primary={module.name} 
                sx={{ 
                  color: isSelected 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                  '& .MuiListItemText-primary': {
                    fontWeight: isSelected ? 600 : 400
                  }
                }} 
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;