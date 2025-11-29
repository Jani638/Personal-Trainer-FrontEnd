import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <HomeIcon />
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <AccountBoxIcon />
          <ListItemButton component={Link} to="/customers">
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <DirectionsRunIcon />
          <ListItemButton component={Link} to="/trainings">
            <ListItemText primary="Trainings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <CalendarMonthIcon />
          <ListItemButton component={Link} to="/calendar">
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <BarChartIcon />
          <ListItemButton component={Link} to="/statistics">
            <ListItemText primary="Statistics" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Button
            size="large"
            color="inherit"
            startIcon={<MenuIcon />}
            onClick={toggleDrawer(true)}
          />
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
}

export default App;