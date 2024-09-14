import React from 'react';
import { Box, Container, Typography} from '@mui/material';
import { keyframes } from '@mui/system';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function Hero() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Welcome to EventMaster
          </Typography>
          <Typography
            variant="h5"
            paragraph
            sx={{
              color: 'white',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            Discover and book amazing events
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;