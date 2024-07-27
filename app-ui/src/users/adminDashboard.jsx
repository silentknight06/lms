import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

      {/* Buttons for managing admin actions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', width: '60%' }}>
        <Button
          variant="contained"
          color="success" // Green
          onClick={() => navigate('/admin/create-user')}
          sx={{ marginBottom: '0.5rem', width: '100%' }}
        >
          Create User
        </Button>
        <Button
          variant="contained"
          color="info" // Light Blue
          onClick={() => navigate('/admin/create-admin')}
          sx={{ marginBottom: '0.5rem', width: '100%' }}
        >
          Create Admin User
        </Button>
        <Button
          variant="contained"
          color="warning" // Orange
          onClick={() => navigate('/admin/addBook')}
          sx={{ marginBottom: '0.5rem', width: '100%' }}
        >
          Add Book to Library
        </Button>
        <Button
          variant="contained"
          color="error" // Red
          onClick={() => navigate('/admin/assign')}
          sx={{ marginBottom: '0.5rem', width: '100%' }}
        >
          Assign Books to Student
        </Button>
        <Button
          variant="contained"
          color="secondary" // Default: usually a light purple; can be customized
          onClick={() => navigate('/admin/bookStatus')}
          sx={{ marginBottom: '0.5rem', width: '100%' }}
        >
          Book Return
        </Button>
        <Button
          variant="contained"
          color="primary" // Default: usually a light purple; can be customized
          onClick={() => navigate('/admin/history')}
          sx={{ width: '100%' }}
        >
          View History
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
