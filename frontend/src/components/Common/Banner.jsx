import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import bannerImage from '../../assets/images/banner.jpg';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 8,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ flex: 1 }}
          >
            <MotionTypography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Join Our Mission to End Hunger
            </MotionTypography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                mb: 3 
              }}
            >
              Every donation counts. Help us make a difference in someone's life today.
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MotionButton
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/donate-food"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                fontWeight: 600,
                px: 6,
                py: 2,
                borderRadius: 2,
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                fontSize: '1.1rem',
              }}
            >
              Donate Now
            </MotionButton>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner; 