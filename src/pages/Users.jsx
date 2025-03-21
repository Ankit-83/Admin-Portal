import { Box, Grid, Card, Avatar, Typography, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import ModuleHeader from '../components/Modules/ModuleHeader';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Administrator',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      location: 'New York',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Developer',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
      location: 'San Francisco',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Designer',
      email: 'mike@example.com',
      phone: '+1 234 567 8902',
      location: 'Chicago',
      status: 'Inactive',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Manager',
      email: 'sarah@example.com',
      phone: '+1 234 567 8903',
      location: 'Boston',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active'
  });

  const handleCreateUser = () => {
    setSelectedUser(null);
    setUserForm({
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      status: 'Active'
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserForm(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSubmit = () => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...userForm, id: user.id, avatar: user.avatar } : user
      ));
    } else {
      // Create new user
      const newUser = {
        ...userForm,
        id: users.length + 1,
        avatar: `https://i.pravatar.cc/150?img=${users.length + 1}`
      };
      setUsers([...users, newUser]);
    }
    setOpenDialog(false);
  };

  return (
    <Box>
      <ModuleHeader 
        actions={['download']} 
        customComponent={
          <Button
            variant="contained"
            onClick={handleCreateUser}
            sx={{ mr: 2 }}
          >
            Add User
          </Button>
        }
      />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ 
                p: 3, 
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={user.avatar} 
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{user.name}</Typography>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{user.email}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{user.phone}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{user.location}</Typography>
                </Box>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={user.status} 
                    color={user.status === 'Active' ? 'success' : 'default'} 
                    size="small" 
                  />
                  <Box>
                    <IconButton size="small" color="primary" onClick={() => handleEditUser(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />
            <TextField
              label="Role"
              fullWidth
              value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              value={userForm.phone}
              onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
            />
            <TextField
              label="Location"
              fullWidth
              value={userForm.location}
              onChange={(e) => setUserForm({ ...userForm, location: e.target.value })}
            />
            <TextField
              select
              label="Status"
              fullWidth
              value={userForm.status}
              onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedUser ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Users;