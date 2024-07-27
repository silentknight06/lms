import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{height:"10vh"}}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Library Management System
            </Typography>
            <Button color="inherit">
              <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                Admin
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Container maxWidth="xl">
        <h1>Welcome to the Home Page</h1>
      </Container> */}
    </Box>
  );
};

export default HomePage;
