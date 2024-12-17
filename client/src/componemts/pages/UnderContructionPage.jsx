import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const UnderConstruction = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        🚧 Page Under Construction 🚧
      </Typography>
      <Typography variant="body1" paragraph>
        We're working hard to bring you something amazing. Stay tuned!
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Box>
  );
};

export default UnderConstruction;
