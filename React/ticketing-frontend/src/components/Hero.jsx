import React from 'react'
import {Box, Container, Typography} from '@mui/material'

function Hero() {
  return (
    <Box
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0,0,0,.5)',
          backgroundBlendMode: 'darken',
          backgroundSize: 'cover',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ color: 'white' }}
          >
            Welcome to My App
          </Typography>
        </Container>
      </Box>
  )
}

export default Hero