import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const MotionTypography = motion(Typography);

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  const handleAboutUsClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToAbout: true } });
    } else {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    handleCloseNavMenu(); // Close mobile menu if open
  };

  const renderNavMenu = () => (
    <>
      <Button
        component={RouterLink}
        to="/"
        onClick={handleCloseNavMenu}
        sx={{
          color: '#8B4513',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'rgba(139, 69, 19, 0.1)',
          },
        }}
      >
        Home
      </Button>
      <Button
        onClick={handleAboutUsClick}
        sx={{
          color: '#8B4513',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'rgba(139, 69, 19, 0.1)',
          },
        }}
      >
        About Us
      </Button>
      {!isAuthenticated && (
        <>
          <Button
            component={RouterLink}
            to="/login"
            onClick={handleCloseNavMenu}
            sx={{
              color: '#8B4513',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
              },
            }}
          >
            Login
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            onClick={handleCloseNavMenu}
            sx={{
              color: '#8B4513',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
              },
            }}
          >
            Register
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            onClick={handleCloseNavMenu}
            sx={{
              color: '#8B4513',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
              },
            }}
          >
            Admin
          </Button>
        </>
      )}
      {isAuthenticated && (
        <>
          <Button
            component={RouterLink}
            to="/donate-food"
            onClick={handleCloseNavMenu}
            sx={{
              color: '#8B4513',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
              },
            }}
          >
            Donate Food
          </Button>
          <Button
            component={RouterLink}
            to="/my-donations"
            onClick={handleCloseNavMenu}
            sx={{
              color: '#8B4513',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
              },
            }}
          >
            My Donations
          </Button>
          {user?.role !== 'admin' && (
            <Button
              component={RouterLink}
              to="/volunteer/register"
              onClick={handleCloseNavMenu}
              sx={{
                color: '#8B4513',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                },
              }}
            >
              Join as Volunteer
            </Button>
          )}
          {user?.role === 'admin' && (
            <Button
              component={RouterLink}
              to="/admin/dashboard"
              onClick={handleCloseNavMenu}
              sx={{
                color: '#8B4513',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                },
              }}
            >
              Admin Dashboard
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: '#DEB887',
        boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)',
        py: 0.5,
        '& .MuiToolbar-root': {
          minHeight: '56px',
          '@media (min-width: 600px)': {
            minHeight: '60px'
          }
        }
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MotionTypography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 900,
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
              color: '#8B4513',
              textDecoration: 'none',
              textShadow: '1px 1px 2px rgba(139, 69, 19, 0.2)',
              letterSpacing: '0.1em',
              '&:hover': {
                color: '#6B3410',
                transition: 'color 0.3s ease',
              },
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              transition: { duration: 0.2 }
            }}
          >
            SNEH
          </MotionTypography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {renderNavMenu()}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderNavMenu()}
            </Menu>
          </Box>

          {/* User Menu */}
          {isAuthenticated && (
            <Box sx={{ ml: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 