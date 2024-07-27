import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateUser = () => {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [role, setRole] = React.useState('student');
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    const userData = {
      username: username,
      name: name,
      email: email,
      contactNumber: contactNumber,
      createdBy : sessionStorage.getItem("username")
    };

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/users/create', userData);
      if (response.status === 201) {
        alert("User created !");
        navigate('/admin', { replace: true });
        // return;
      }
    } catch (error) {
      alert("Error creating user: " + error.response.data.message);
      console.error('Error creating user', error);
      return;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box className='create-user'>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
      >
        Back
      </Button>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '350px', margin: 'auto' }} onSubmit={handleCreateUser}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contact Number"
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="student">Student</MenuItem>
            {/* <MenuItem value="admin">Admin</MenuItem> */}
          </Select>
        </FormControl>
        <Button variant="contained"  type='submit'>Create User</Button>
        <Button
          variant="contained"
          color="secondary" // Default: usually a light purple; can be customized
          onClick={() => navigate('/admin/dashboard')}
          sx={{ width: '100%' }}
        >
          Go To Dashboard
        </Button>
      </form>
    </Box>
  );
};

export default CreateUser;
