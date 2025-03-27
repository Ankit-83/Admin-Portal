import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Badge, IconButton, useTheme, Box, Drawer, Radio, RadioGroup, FormControlLabel, FormControl, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DownloadIcon from '@mui/icons-material/Download';
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
  const [openDrawer, setOpenDrawer] = useState(false);
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

  const handleDownload = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    // Reset all form data
    setReportType('csv');
    setCsvDropdown1('');
    setCsvDropdown2('');
    setCsvStartDate(null);
    setCsvEndDate(null);
    setPdfDropdown1('');
    setPdfDropdown2('');
    setPdfStartDate(null);
  };

  const [reportType, setReportType] = useState('csv');
  const [csvDropdown1, setCsvDropdown1] = useState('');
  const [csvDropdown2, setCsvDropdown2] = useState('');
  const [csvStartDate, setCsvStartDate] = useState(null);
  const [csvEndDate, setCsvEndDate] = useState(null);
  const [pdfDropdown1, setPdfDropdown1] = useState('');
  const [pdfDropdown2, setPdfDropdown2] = useState('');
  const [pdfStartDate, setPdfStartDate] = useState(null);

  const handleDownloadReport = () => {
    // Add your download logic here
    handleCloseDrawer(); // This will now also reset the form
  };

  const isDateRangeMoreThan3Months = () => {
    if (!csvStartDate || !csvEndDate) return false;
    const start = new Date(csvStartDate);
    const end = new Date(csvEndDate);
    const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
      (end.getMonth() - start.getMonth());
    return diffInMonths >= 2;
  };

  return (
    <>
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
          
          <IconButton 
            onClick={handleDownload}
            id='downloadBtn'
            className='downloadIconBtn'
            sx={{ 
              mr: 2,
              color: theme.palette.text.primary,
              '&:hover': { 
                backgroundColor: theme.palette.mode === 'light' ? '#e9ecef' : 'rgba(255, 255, 255, 0.08)' 
              } 
            }}
          >
            <DownloadIcon />
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
  
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '30%',
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#333'}`,
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Downloads</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControl>
              <RadioGroup
                row
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                <FormControlLabel value="pdf" control={<Radio />} label="PDF Report" />
              </RadioGroup>
            </FormControl>
            <IconButton 
              onClick={handleCloseDrawer}
              sx={{
                color: theme.palette.grey[500],
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {reportType === 'csv' ? (
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  value={csvDropdown1}
                  onChange={(e) => setCsvDropdown1(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Select Device</MenuItem>
                  <MenuItem value="1">Polludrone</MenuItem>
                  <MenuItem value="2">AQbot</MenuItem>
                  <MenuItem value="2">Dustroid</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  value={csvDropdown2}
                  onChange={(e) => setCsvDropdown2(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Select Location</MenuItem>
                  <MenuItem value="1">Kalupur</MenuItem>
                  <MenuItem value="2">Sanand</MenuItem>
                  <MenuItem value="2">Thaltej</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <DatePicker
                    label="Start Date"
                    value={csvStartDate}
                    onChange={setCsvStartDate}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                  <DatePicker
                    label="End Date"
                    value={csvEndDate}
                    onChange={setCsvEndDate}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
          ) : (
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  value={pdfDropdown1}
                  onChange={(e) => setPdfDropdown1(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Select Device</MenuItem>
                  <MenuItem value="1">Polludrone</MenuItem>
                  <MenuItem value="2">AQbot</MenuItem>
                  <MenuItem value="2">Dustroid</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  value={pdfDropdown2}
                  onChange={(e) => setPdfDropdown2(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Select Location</MenuItem>
                  <MenuItem value="1">Kalupur</MenuItem>
                  <MenuItem value="2">Sanand</MenuItem>
                  <MenuItem value="2">Thaltej</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={pdfStartDate}
                  onChange={setPdfStartDate}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Box>
          )}

          <Box sx={{ mt: 'auto', display: 'flex', gap: 2, pt: 3 }}>
            {reportType === 'csv' && isDateRangeMoreThan3Months() ? (
              <Button variant="contained" color="primary" onClick={handleDownloadReport}>
                Email
              </Button>
            ) : (
              <Button variant="contained" onClick={handleDownloadReport}>
                Download
              </Button>
            )}
            <Button onClick={handleCloseDrawer}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;