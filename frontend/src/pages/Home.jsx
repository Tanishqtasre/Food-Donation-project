import { Box, Button, Container, Typography, Grid, Card, CardContent, CardMedia, Divider, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

// Import images
import bannerImage from '../assets/images/banner.jpg';
import howItWorks1 from '../assets/images/how-it-works-1.jpg';
import howItWorks2 from '../assets/images/how-it-works-2.jpg';
import howItWorks3 from '../assets/images/how-it-works-3.jpg';
import aboutUsImage from '../assets/images/about-us.jpg';
import makeDifferenceImage from '../assets/images/make-difference.jpg';
import team1 from '../assets/images/team-1.jpg';
import team2 from '../assets/images/team-2.jpg';
import team3 from '../assets/images/team-3.jpg';
import team4 from '../assets/images/team-4.jpg';
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg';
import testimonial3 from '../assets/images/testimonial-3.jpg';

// Styled components with motion
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionIconButton = motion(IconButton);

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
    tap: {
      scale: 0.95,
    },
  };

  const howItWorks = [
    {
      title: "Register & List Food",
      description: "Sign up and list your surplus food items with details like quantity, type, and freshness",
      image: howItWorks1,
      icon: <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Connect with Food Banks",
      description: "Local food banks and charities will be notified and can accept your donation",
      image: howItWorks2,
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Make a Difference",
      description: "Your donated food reaches those in need through our network of trusted partners",
      image: howItWorks3,
      icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
  ];

  const footerLinks = [
    {
      title: 'About Us',
      links: [
        { text: 'Our Mission', url: '/about#mission' },
        { text: 'Our Team', url: '/about#team' },
        { text: 'Success Stories', url: '/about#stories' },
      ],
    },
    {
      title: 'Get Involved',
      links: [
        { text: 'Donate Food', url: '/donate-food' },
        { text: 'Volunteer', url: '/volunteer' },
        { text: 'Partner With Us', url: '/partners' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', url: '/blog' },
        { text: 'FAQ', url: '/faq' },
        { text: 'Contact Us', url: '/contact' },
      ],
    },
  ];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    // Handle scroll to About section when navigating from other pages
    if (location.state?.scrollToAbout) {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        setTimeout(() => {
          aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100); // Small delay to ensure DOM is ready
      }
    }
  }, [location]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
    tap: {
      scale: 0.95,
    },
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
    <AnimatePresence mode="wait">
      <MotionBox
        component="main"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: '90vh',
              backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
              filter: 'brightness(1.1) contrast(1.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                zIndex: 1
            }
          }}
        >
            {/* Background animations with reduced opacity */}
          <MotionBox
            sx={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
              top: '-100px',
              right: '-100px',
              filter: 'blur(5px)',
                zIndex: 2
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <MotionBox
            sx={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
              bottom: '-50px',
              left: '-50px',
              filter: 'blur(3px)',
                zIndex: 2
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          </Box>

          {/* Text and Buttons Section */}
          <Box 
                  sx={{ 
              py: 4, 
              bgcolor: '#DEB887',
              color: '#8B4513',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 4px 20px rgba(139, 69, 19, 0.15)'
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                  <MotionButton
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/donate-food"
                    sx={{ 
                      bgcolor: '#8B4513',
                      color: '#FFF8DC',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: '#6B3410'
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Donate Food
                  </MotionButton>
                  <MotionButton
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/volunteer"
                    sx={{ 
                      borderColor: '#8B4513',
                      color: '#8B4513',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        borderColor: '#6B3410',
                        bgcolor: 'rgba(139, 69, 19, 0.04)'
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join as Volunteer
                  </MotionButton>
                </Box>
              </Box>
          </Container>
        </Box>

          {/* Impact Numbers Section */}
          <Box 
            sx={{ 
              py: 6, 
              bgcolor: '#DEB887',
              color: '#8B4513',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 4px 20px rgba(139, 69, 19, 0.15)'
            }} 
            ref={ref}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                {[
                  { icon: <RestaurantIcon sx={{ fontSize: 40 }} />, number: '50,000+', label: 'Meals Delivered' },
                  { icon: <PeopleIcon sx={{ fontSize: 40 }} />, number: '10,000+', label: 'Lives Impacted' },
                  { icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, number: '1,000+', label: 'Food Drives' },
                  { icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />, number: '500+', label: 'Volunteers' },
                ].map((item, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <MotionBox
                      variants={itemVariants}
                      sx={{ 
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)'
                        }
                      }}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: index * 0.2 }}
                    >
                      <MotionBox
                        sx={{ color: '#8B4513', mb: 2 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      >
                        {item.icon}
                      </MotionBox>
                      <MotionTypography
                        variant="h3"
                        component="div"
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1,
                          color: '#8B4513'
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        {item.number}
                      </MotionTypography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#A0522D',
                          fontWeight: 500
                        }}
                      >
                        {item.label}
                      </Typography>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
          </Container>
        </Box>

          {/* How It Works Section */}
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <MotionTypography
              variant="h2"
              textAlign="center"
              gutterBottom
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </MotionTypography>
            <MotionTypography
              variant="h5"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Three simple steps to share surplus food with those in need
            </MotionTypography>
            <Grid container spacing={4}>
                {[
                  {
                    title: "Register & List Food",
                    description: "Sign up and list your surplus food items with details like quantity, type, and freshness",
                    image: howItWorks1,
                    icon: <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  },
                  {
                    title: "Connect with Food Banks",
                    description: "Local food banks and charities will be notified and can accept your donation",
                    image: howItWorks2,
                    icon: <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  },
                  {
                    title: "Make a Difference",
                    description: "Your donated food reaches those in need through our network of trusted partners",
                    image: howItWorks3,
                    icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  },
                ].map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <MotionCard
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={step.image}
                      alt={step.title}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MotionBox
                          sx={{ mr: 2 }}
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        >
                          {step.icon}
                        </MotionBox>
                        <Typography variant="h5">
                          {step.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {step.description}
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        <MotionButton
                          variant="contained"
                          fullWidth
                          component={Link}
                          to="/donate-food"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Start Donating
                        </MotionButton>
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* About Us Section */}
          <Box
            id="about-section"
            component="section"
            sx={{
              py: { xs: 6, md: 10 },
              backgroundColor: '#FFF8DC',
              scrollMarginTop: '64px', // Add scroll margin to account for fixed navbar
            }}
          >
          <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                  <MotionBox
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <Typography variant="h2" component="h2" gutterBottom>
                  About Us
                    </Typography>
                <MotionTypography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  We are a dedicated team working to reduce food waste and fight hunger in our community. 
                  Our platform connects food donors with local food banks and charities, ensuring that 
                  surplus food reaches those who need it most.
                </MotionTypography>
                <MotionButton
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/about"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  sx={{ mt: 2 }}
                >
                  Learn More
                </MotionButton>
                  </MotionBox>
              </Grid>
              <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                    position: 'relative',
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}>
                    {[
                      { img: team1, name: 'Team Member 1' },
                      { img: team2, name: 'Team Member 2' },
                      { img: team3, name: 'Team Member 3' },
                      { img: team4, name: 'Team Member 4' }
                    ].map((member, index) => (
                      <MotionBox
                        key={index}
                        sx={{
                          width: '100%',
                          paddingBottom: '100%',
                          position: 'relative',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
                          }
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Box
                  component="img"
                          src={member.img}
                          alt={member.name}
                          loading="lazy"
                  sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: 'scale(1.01)',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            }
                          }}
                        />
                      </MotionBox>
                    ))}
                  </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <MotionTypography
              variant="h2"
              textAlign="center"
              gutterBottom
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              What People Say
            </MotionTypography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {[
                {
                    name: "Shubham",
                  role: "Food Donor",
                  text: "The process was so simple and efficient. Knowing that my excess food is helping those in need gives me great satisfaction.",
                  image: testimonial1
                },
                {
                    name: "Romil",
                  role: "Volunteer",
                  text: "Volunteering with this platform has been a rewarding experience. The impact we make in our community is truly meaningful.",
                  image: testimonial2
                },
                {
                    name: "Abhinav",
                    role: "Food Bank Manager",
                  text: "This platform has revolutionized how we receive and distribute food donations. It's a game-changer for our operations.",
                  image: testimonial3
                }
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <MotionCard
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          component="img"
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            mr: 2,
                            objectFit: 'cover'
                          }}
                        />
                        <Box>
                          <Typography variant="h6">{testimonial.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        "{testimonial.text}"
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

          {/* Call to Action Section */}
          <Box
          sx={{
            py: 8,
            position: 'relative',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: `url(${makeDifferenceImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                zIndex: 1
              }
            }}
          >
            <Container 
              maxWidth="md" 
              sx={{ 
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: '2rem',
                borderRadius: '10px',
                backdropFilter: 'blur(5px)'
              }}
            >
              <Typography
              variant="h3"
              gutterBottom
                sx={{
                  color: '#8B4513',
                  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                  fontWeight: 'bold',
                  mb: 3
                }}
            >
              Ready to Make a Difference?
              </Typography>
              <Typography
              variant="h5"
                sx={{ 
                  color: '#A0522D',
                  textShadow: '1px 1px 3px rgba(255, 255, 255, 0.8)',
                  maxWidth: '800px',
                  margin: '0 auto',
                  fontWeight: 500
                }}
            >
              Join our community of food donors and volunteers today.
              </Typography>
          </Container>
          </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 6,
            px: 2,
            mt: 'auto',
            bgcolor: 'background.paper',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
                {[
                  {
                    title: 'About Us',
                    links: [
                      { text: 'Our Mission', url: '/about#mission' },
                      { text: 'Our Team', url: '/about#team' },
                      { text: 'Success Stories', url: '/about#stories' },
                    ],
                  },
                  {
                    title: 'Get Involved',
                    links: [
                      { text: 'Donate Food', url: '/donate-food' },
                      { text: 'Volunteer', url: '/volunteer' },
                      { text: 'Partner With Us', url: '/partners' },
                    ],
                  },
                  {
                    title: 'Resources',
                    links: [
                      { text: 'Blog', url: '/blog' },
                      { text: 'FAQ', url: '/faq' },
                      { text: 'Contact Us', url: '/contact' },
                    ],
                  },
                ].map((section, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <MotionTypography
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {section.title}
                  </MotionTypography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                    {section.links.map((link, linkIndex) => (
                      <Box component="li" key={linkIndex} sx={{ mb: 1 }}>
                        <MotionButton
                          component={Link}
                          to={link.url}
                          color="inherit"
                          sx={{ p: 0, textTransform: 'none' }}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index * 0.1) + (linkIndex * 0.1) }}
                        >
                          {link.text}
                        </MotionButton>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
              <Grid item>
                <MotionTypography
                  variant="body2"
                  color="text.secondary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  © {new Date().getFullYear()} Food Donation Platform. All rights reserved.
                </MotionTypography>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {[
                      { icon: <FacebookIcon />, url: 'https://facebook.com' },
                      { icon: <TwitterIcon />, url: 'https://twitter.com' },
                      { icon: <InstagramIcon />, url: 'https://instagram.com' },
                      { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
                    ].map((social, index) => (
                    <MotionIconButton
                      key={index}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {social.icon}
                    </MotionIconButton>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </MotionBox>
    </AnimatePresence>
    </Box>
  );
};

export default Home; 