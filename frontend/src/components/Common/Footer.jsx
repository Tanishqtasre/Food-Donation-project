import { Box, Container, Typography, Link, Grid, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Sneha Food Donation
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
              Connecting food donors with those in need, reducing waste and fighting hunger.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link
                component={RouterLink}
                to="/find-food"
                color="inherit"
                sx={{ 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline',
                  } 
                }}
              >
                Find Food
              </Link>
              <Link
                component={RouterLink}
                to="/donate-food"
                color="inherit"
                sx={{ 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline',
                  } 
                }}
              >
                Donate Food
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                sx={{ 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline',
                  } 
                }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                sx={{ 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline',
                  } 
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2, lineHeight: 1.6 }}>
              Email: info@snehafooddonation.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2, lineHeight: 1.6 }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
              Address: 123 Food Street, Charity City, 12345
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Sneha Food Donation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 