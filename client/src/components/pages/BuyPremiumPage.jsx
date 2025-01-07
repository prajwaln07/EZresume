import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PremiumRequired = () => {
  return (
 <div className='h-screen'>

    
<div className='h-4/6 w-full flex justify-center align-center  items-center py-0' >
<img className='h-5/6 w-4/12' src='https://res.cloudinary.com/dkynwi65w/image/upload/v1734421333/openart-image_vveqGWyR_1730110513576_raw_u7uegq.jpg'></img>
</div>
 
 <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20vh',
        backgroundColor: '#f4f4f4',
        padding: 3,
      }}
    >

      <Typography variant="h4" component="h1" gutterBottom>
        🚨 Premium Subscription Required 🚨
      </Typography>
      <Typography variant="body1" paragraph>
        Unlock exclusive features and get the most out of your experience with our premium plan.
      </Typography>
      <Link to="/premium" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Upgrade to Premium
        </Button>
      </Link>
    </Box>



 </div>
  );
};

export default PremiumRequired;
