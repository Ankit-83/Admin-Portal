import { Box, Grid, Card, Typography, Chip, Avatar } from '@mui/material';
import ModuleHeader from '../components/Modules/ModuleHeader';

function Projects() {
  const projects = [
    { title: 'Website Redesign', status: 'In Progress', team: 5 },
    { title: 'Mobile App Development', status: 'Completed', team: 8 },
    { title: 'Database Migration', status: 'Planning', team: 3 },
    { title: 'API Integration', status: 'In Progress', team: 4 },
    { title: 'Security Audit', status: 'Review', team: 6 },
  ];

  return (
    <Box>
      <ModuleHeader />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{project.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={project.status} 
                    color={project.status === 'Completed' ? 'success' : 'primary'} 
                    size="small" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>Team:</Typography>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                      {project.team}
                    </Avatar>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Projects;