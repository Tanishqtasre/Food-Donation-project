import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      description: 'Former restaurant owner with a passion for reducing food waste.',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      description: 'Logistics expert with 10+ years in supply chain management.',
    },
    {
      name: 'Priya Patel',
      role: 'Community Relations',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      description: 'NGO veteran focused on building meaningful partnerships.',
    },
    {
      name: 'David Wilson',
      role: 'Technology Lead',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      description: 'Tech innovator passionate about social impact.',
    },
  ];

  const howItWorks = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'Food Registration',
      description: 'Restaurants and donors register surplus food through our platform.',
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Collection & Delivery',
      description: 'Our volunteer network picks up and delivers food to nearby food banks.',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Distribution',
      description: 'Food banks distribute meals to those in need in their communities.',
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      title: 'Community Impact',
      description: 'Together we reduce food waste and fight hunger in our communities.',
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Connecting surplus food with those who need it most
          </Typography>
        </Box>

        {/* Mission & Vision Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" gutterBottom color="primary">
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                To reduce food waste and fight hunger by creating an efficient bridge between food donors
                and those in need, powered by technology and community action.
              </Typography>
              <Typography variant="body1">
                We believe that no good food should go to waste while people go hungry. Our platform
                connects restaurants, hotels, and food businesses with local food banks and charities,
                ensuring surplus food reaches those who need it most.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" gutterBottom color="primary">
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                A world where surplus food is shared, not wasted, and every community has access to
                nutritious meals.
              </Typography>
              <Typography variant="body1">
                We envision a future where technology and community collaboration eliminate food waste
                and hunger, creating a sustainable and equitable food system for all. Through our
                platform, we're making this vision a reality, one meal at a time.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* How It Works Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary" sx={{ mb: 4 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {howItWorks.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>{step.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary" sx={{ mb: 4 }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 