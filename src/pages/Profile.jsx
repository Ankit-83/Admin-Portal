import { useState } from 'react';
import { 
  Box, 
  Card, 
  Avatar, 
  Typography, 
  Button, 
  TextField, 
  IconButton,
  Grid,
  Divider
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-avatar.png');
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    designation: 'Software Developer',
    department: 'Engineering',
    location: 'New York, USA'
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
    // Add API call here to save user details
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
            onClick={editMode ? handleSave : handleEdit}
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profileImage}
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <input
              accept="image/*"
              type="file"
              id="profile-image-upload"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="profile-image-upload">
              <IconButton
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {Object.entries(userDetails).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={(e) => setUserDetails({ ...userDetails, [key]: e.target.value })}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
                sx={{ mb: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}

export default Profile;