import { Box, Card, Grid, Typography, LinearProgress } from '@mui/material';
import ModuleHeader from '../components/Modules/ModuleHeader';

function Analytics() {
  const metrics = [
    { name: 'User Engagement', value: 78, color: '#2196f3' },
    { name: 'Project Completion', value: 92, color: '#4caf50' },
    { name: 'System Performance', value: 85, color: '#ff9800' },
    { name: 'Resource Utilization', value: 65, color: '#f44336' },
  ];

  return (
    <Box>
      <ModuleHeader actions={['download', 'upload']} />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{metric.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={metric.value} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color
                        }
                      }} 
                    />
                  </Box>
                  <Typography variant="body2">{metric.value}%</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Analytics;