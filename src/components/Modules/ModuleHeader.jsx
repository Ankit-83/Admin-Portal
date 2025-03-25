import { Box, Button, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

function ModuleHeader({ title, actions = ['create', 'edit', 'delete', 'download', 'upload'], customComponent }) {
  return (
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e0e0e0'
    }}>
      {customComponent}
      <Box>
        {actions.includes('create') && (
          <Button startIcon={<AddIcon />} variant="contained" sx={{ mr: 1 }}>
            Create
          </Button>
        )}
        {actions.includes('edit') && (
          <Button startIcon={<EditIcon />} variant="outlined" sx={{ mr: 1 }}>
            Edit
          </Button>
        )}
        {actions.includes('delete') && (
          <Button startIcon={<DeleteIcon />} variant="outlined" sx={{ mr: 1 }}>
            Delete
          </Button>
        )}
        {actions.includes('download') && (
          <Button variant="outlined" sx={{ mr: 1 }}>
            Download
          </Button>
        )}
        {actions.includes('upload') && (
          <Button variant="outlined">
            Upload
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ModuleHeader;