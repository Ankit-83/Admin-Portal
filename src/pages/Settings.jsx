import { Box, Card, Grid, Typography, Switch, FormControlLabel, Divider } from '@mui/material';
import ModuleHeader from '../components/Modules/ModuleHeader';

function Settings() {
  const settings = [
    { category: 'Notifications', options: [
      { name: 'Email Notifications', defaultChecked: true },
      { name: 'Push Notifications', defaultChecked: false },
      { name: 'SMS Alerts', defaultChecked: false },
    ]},
    { category: 'Privacy', options: [
      { name: 'Profile Visibility', defaultChecked: true },
      { name: 'Activity Status', defaultChecked: true },
      { name: 'Data Sharing', defaultChecked: false },
    ]},
    { category: 'System', options: [
      { name: 'Dark Mode', defaultChecked: false },
      { name: 'Auto Updates', defaultChecked: true },
      { name: 'Performance Mode', defaultChecked: false },
    ]},
  ];

  return (
    <Box>
      <ModuleHeader actions={['save']} />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {settings.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{section.category}</Typography>
                <Divider sx={{ mb: 2 }} />
                {section.options.map((option, optIndex) => (
                  <FormControlLabel
                    key={optIndex}
                    control={<Switch defaultChecked={option.defaultChecked} />}
                    label={option.name}
                    sx={{ display: 'block', mb: 1 }}
                  />
                ))}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Settings;