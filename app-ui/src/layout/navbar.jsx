import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = [ 'admin'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useNavigate(); // Initialize history for navigation

  const handleLogout = () =>{
    sessionStorage.clear()
    
    // document.location.reload()
    history('/');

  }

  const handleNavigation = (route) => {
    history(`/${route}`); // Navigate to the specified route
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // const drawer = (
  //   <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  //     <Typography variant="h6" sx={{ my: 2 }}>
  //       Taks Management Service
  //     </Typography>
  //     <Divider />
  //     <List>
  //       {navItems.map((item) => (
  //         <ListItem key={item} disablePadding>
  //           <ListItemButton sx={{ textAlign: 'center' }}>
  //             <ListItemText primary={item}  />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2, display: { xs: 'none', sm: 'block' }, color:"black" }}
          >
            Library Management Service
          </Typography>
          {/* {sessionStorage.getItem('role')==='admin'?
          <Box sx={{ flexGrow:1, display: { xs: 'none', sm: 'flex' } , justifyContent:"space-around"}}>
            {navItems.map((item) => (
              <Button key={item} onClick={() => handleNavigation(item)} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          :
          <Box sx={{ flexGrow:1, display: { xs: 'none', sm: 'flex' } , justifyContent:"space-around"}}>
              <Button key='tasks-default' onClick={() => handleNavigation('tasks')} sx={{ color: '#fff' }}>
                Tasks
              </Button>
          </Box>
          
          } */}
  <Box sx={{ flexGrow:1, display: { xs: 'none', sm: 'flex' } , justifyContent:"end"}} color="black">
            {navItems.map((item) => (
              <Button key={item} onClick={() => handleNavigation(item)} sx={{ color: 'black' }}>
                {item}
              </Button>
            ))}
          </Box>

          {/* <Box sx={{  display: { xs: 'none', sm: 'block' }, marginLeft:"2.5rem", marginRight:"1rem" }}>
          <Typography
            component="span"
            sx={{  display: { xs: 'none', sm: 'block' } }}
          >
            Role : <Typography component={'span'} sx={{fontSize:"14px", color:"lightblue"}}>{sessionStorage.getItem('role')?.toUpperCase()}</Typography>
          </Typography>
          
          </Box>
          <Box>
          <Typography
            component="span"
            sx={{  display: { xs: 'none', sm: 'block' } }}
          >
            UserName : <Typography component={'span'} sx={{fontSize:"14px", color:"lightblue"}}>{sessionStorage.getItem('username')?.toUpperCase()}</Typography></Typography>
          </Box> */}
          {sessionStorage.getItem('username') ?
          <Box sx={{  display: { xs: 'none', sm: 'block' }, marginLeft:"2.5rem", marginRight:"1rem" }} color="black">
          <Button onClick={() => handleLogout()} sx={{ color: 'black' }}>
            Logout
              </Button>
          </Box>
          : null}
        </Toolbar>
      </AppBar>
      {/* <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav> */}
      {/* <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography>
      </Box> */}
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;