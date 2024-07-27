import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleStudentLogin = async (event) => {
    event.preventDefault();

    try {
      // Make API request for student user login using username
      const response = await axios.get(process.env.REACT_APP_API_URL + '/users/login', {
        params:{
          username: username
        }
      });

      if (response.status === 200) {
        console.log("response ", response)
        addStudentDetailsInSession(response.data);
        navigate('/userHistory');
      } else {
        alert('Invalid username');
      }
    } catch (error) {
      console.error('Error logging in student user:', error);
      alert('An error occurred while logging in');
    }
  };

  const addStudentDetailsInSession = (data) => {
    sessionStorage.clear();
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('role', data.role);
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('email', data.email)
    // Add more student details to session as needed
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleStudentLogin} style={{ width: "300px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component='h1' style={{ fontWeight: 'bold', textAlign: 'left', alignSelf:'normal', fontSize:"1.5rem", color:"blueviolet" }}>Student Login</Typography>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size='small'
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
