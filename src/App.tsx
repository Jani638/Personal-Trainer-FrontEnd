import { Link, Outlet } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Container, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import React from 'react';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';

function App() {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <HomeIcon/>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <AccountBoxIcon/>
          <ListItemButton component={Link} to="/customers">
            <ListItemText primary="Customers"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <DirectionsRunIcon/>
          <ListItemButton component={Link} to="/trainings">
            <ListItemText primary="Trainings"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
      <Toolbar sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Button size='large' color='inherit' startIcon={<MenuIcon/>} onClick={toggleDrawer(true)}/>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Typography variant="h6">Personal Trainer</Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl">
      <Outlet/>
    </Container>
    </>
  )
}

export default App
