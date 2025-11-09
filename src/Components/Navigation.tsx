import { Container } from '@mui/material';
import { Link } from 'react-router-dom';


function Navigation(){

  return(
    <Container>
      <Link to="/" >HOME</Link>
      <Link to="/customers" >Customers</Link>
      <Link to="/trainings" >Trainings</Link>
    </Container>
  )
}

export default Navigation;