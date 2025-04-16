import { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflow: 'auto',
};

export default function UserViewList({ open, close, users = [], selectedUser }) {
  const [rows] = useState(users);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    {
      field: 'username',
      headerName: 'First Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'displayname',
      headerName: 'Last Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    // {
    //   field: 'username',
    //   headerName: 'Username',
    //   flex: 1,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
  ];

  const handleSelectionChange = (newSelection) => {
    const selectedId = newSelection[0];
    const selected = rows.find((row) => row.id === selectedId || row.header_id === selectedId);
    setSelectedRow(selected);
  };

  const handleOpenClick = () => {
    if (selectedRow && selectedUser) {
      selectedUser(selectedRow);
    }
    close();
  };

  const handleCloseClick = () => {
    close();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseClick}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="user-modal-title" variant="h6" fontWeight={600}>
            Users List
          </Typography>
          <Tooltip title="Close">
            <IconButton onClick={handleCloseClick}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography id="user-modal-description" variant="body2" color="text.secondary" mb={2}>
          Select a user from the list to proceed.
        </Typography>

        <Box
          sx={{
            height: 400,
            width: '100%',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f4f6f8',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f9fafb',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.autoid || row.header_id || row.username}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableSelectionOnClick
            onSelectionModelChange={handleSelectionChange}
          />
        </Box>

        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={handleCloseClick}>
            Close
          </Button>
          <Button variant="contained" onClick={handleOpenClick} disabled={!selectedRow}>
            Open
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
