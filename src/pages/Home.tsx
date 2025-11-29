import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ padding: 4, display: 'inline-block' }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Personal Trainer app!
        </Typography>
        <Typography variant="body1">
          Easily manage your customers and trainings!
        </Typography>
      </Paper>
    </div>
  );
}

export default Home;