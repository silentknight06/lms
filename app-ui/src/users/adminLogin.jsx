import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAdmin, setCreateAdmin] = useState(false)
  const navigate = useNavigate();
  const handleCreateAdmin = () =>{
    setCreateAdmin(!createAdmin)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();

    try {
      // Make API request for admin user creation
      const response = await axios.post(process.env.REACT_APP_API_URL + '/admin/login', {
        email: email,
        password: password
      });

      if (response.status === 201) {
        alert('Admin user created successfully!');
      } else {
        alert('Failed to create admin user');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
      alert('An error occurred while creating admin user');
    }
  };
  useEffect(()=>{
    if(sessionStorage.getItem('role')==='admin'){
      // cons
      navigate('/admin/dashboard')
    }
  })

  const handleAdminSubmission = async (event) => {
    event.preventDefault();

    try {
      // Make API request for admin user login
      const response = await axios.post(process.env.REACT_APP_API_URL + '/admin/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        addAdminDetailsInSession(response.data);
        alert('LoggedIn Successfully!');

        navigate('/admin/dashboard');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in admin user:', error);
      alert('An error occurred while logging in');
    }
  };

  const addAdminDetailsInSession = (item) => {
    sessionStorage.clear();
    sessionStorage.setItem('email', item.name);
    sessionStorage.setItem('role', item.role);
    sessionStorage.setItem('token', item.token);
    sessionStorage.setItem('username', item.username)

    // Add more admin details to session as needed
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleAdminSubmission} style={{ width: "300px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component='h1' style={{ fontWeight: 'bold', textAlign: 'left',alignSelf:'normal', fontSize:"1.5rem", color:"purple" }}>Admin Desk Login</Typography>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size='small'
          >
            Admin Login
          </Button>
        </Box>
      </form>
      
    </Box>
  );
};

export default AdminLoginPage;
