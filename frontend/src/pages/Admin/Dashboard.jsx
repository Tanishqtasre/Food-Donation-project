import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  Restaurant as RestaurantIcon,
  Business as BusinessIcon,
  LocalShipping as DeliveryIcon,
  VolunteerActivism as VolunteerIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { foodDonationAPI, userAPI, organizationAPI, adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalOrganizations: 0,
    totalDeliveries: 0,
    totalVolunteers: 0,
    recentDonations: [],
    recentUsers: [],
    recentOrganizations: [],
    recentVolunteers: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch all required data
      const [usersResponse, donationsResponse, orgsResponse, volunteersResponse] = await Promise.all([
        userAPI.getAllUsers(),
        foodDonationAPI.getAllDonations(),
        organizationAPI.getAllOrganizations(),
        adminAPI.getAllVolunteers(),
      ]);

      setStats({
        totalUsers: usersResponse.data.length,
        totalDonations: donationsResponse.data.length,
        totalOrganizations: orgsResponse.data.length,
        totalDeliveries: donationsResponse.data.filter(d => d.status === 'delivered').length,
        totalVolunteers: volunteersResponse.data.length,
        recentDonations: donationsResponse.data.slice(0, 5),
        recentUsers: usersResponse.data.slice(0, 5),
        recentOrganizations: orgsResponse.data.slice(0, 5),
        recentVolunteers: volunteersResponse.data.slice(0, 5),
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();

    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchDashboardData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 40, color: color, mr: 2 }} />
          <Box>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading && !refreshing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Admin Dashboard
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton 
            onClick={handleRefresh} 
            disabled={refreshing}
            sx={{ 
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'rotate(180deg)' }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={PeopleIcon}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Donations"
            value={stats.totalDonations}
            icon={RestaurantIcon}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Organizations"
            value={stats.totalOrganizations}
            icon={BusinessIcon}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Volunteers"
            value={stats.totalVolunteers}
            icon={VolunteerIcon}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        {/* Recent Donations */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Donations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Donor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentDonations.map((donation) => (
                    <TableRow key={donation._id}>
                      <TableCell>{donation.title}</TableCell>
                      <TableCell>{donation.donor?.name || 'Anonymous'}</TableCell>
                      <TableCell>{donation.status}</TableCell>
                      <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Volunteers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Volunteers
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell>Vehicle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentVolunteers.map((volunteer) => (
                    <TableRow key={volunteer._id}>
                      <TableCell>{volunteer.name}</TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.availability}</TableCell>
                      <TableCell>{volunteer.vehicle}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Users */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Users
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Organizations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Organizations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentOrganizations.map((org) => (
                    <TableRow key={org._id}>
                      <TableCell>{org.name}</TableCell>
                      <TableCell>{org.type}</TableCell>
                      <TableCell>{org.contactPerson?.email}</TableCell>
                      <TableCell>{org.address?.city}</TableCell>
                      <TableCell>{new Date(org.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 