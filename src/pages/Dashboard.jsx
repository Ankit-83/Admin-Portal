import { Box, Grid, Card, Typography, ToggleButtonGroup, ToggleButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ModuleHeader from '../components/Modules/ModuleHeader';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TableViewIcon from '@mui/icons-material/TableView';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';

function Dashboard() {
  const [view, setView] = useState('analytics');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const stats = [
    { title: 'Total Users', value: '1,234', growth: '+15%' },
    { title: 'Active Projects', value: '45', growth: '+8%' },
    { title: 'Growth Rate', value: '+15%', growth: '+2%' },
    { title: 'Analytics', value: '89%', growth: '+5%' },
  ];

  const tableData = [
    { id: 1, project: 'Lorem Ipsum Project', status: 'Active', progress: '75%', date: '2024-01-15' },
    { id: 2, project: 'Dolor Sit Amet', status: 'Pending', progress: '45%', date: '2024-01-16' },
    { id: 3, project: 'Consectetur Design', status: 'Completed', progress: '100%', date: '2024-01-17' },
    { id: 4, project: 'Adipiscing Platform', status: 'Active', progress: '60%', date: '2024-01-18' },
    { id: 5, project: 'Elit Development', status: 'On Hold', progress: '30%', date: '2024-01-19' },
  ];

  return (
    <Box>
      <ModuleHeader 
        actions={['download']} 
        customComponent={
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
          >
            <ToggleButton value="analytics" aria-label="analytics view">
              <AnalyticsIcon sx={{ mr: 1 }} /> Analytics
            </ToggleButton>
            <ToggleButton value="table" aria-label="table view">
              <TableViewIcon sx={{ mr: 1 }} /> Table View
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      {view === 'analytics' ? (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    <TrendingUpIcon sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>{stat.value}</Typography>
                  <Typography color="text.secondary">{stat.title}</Typography>
                  <Typography color="success.main" sx={{ mt: 1 }}>
                    {stat.growth}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.progress}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;