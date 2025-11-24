import { Outlet } from 'react-router-dom';
import Navigation from './Components/Navigation'
import { AppBar, Typography, Toolbar, Container } from '@mui/material';
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';

function App() {

  return (
    <>
    <div style={{ width: '100%', margin: '0 auto' }}>
        <AppBar position="static">
          <Toolbar sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Button size='large' color='inherit' startIcon={<MenuIcon/>}>
            
          </Button>
            <Typography variant="h6">Personal Trainer</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth="xl">
        <Navigation/>
        <Outlet/>
      </Container>
    </>
  )
}

export default App
