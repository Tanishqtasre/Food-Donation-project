import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { foodDonationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await foodDonationAPI.getMyDonations();
      setDonations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch donations');
      setLoading(false);
    }
  };

  const handleOpenDialog = (donation) => {
    setSelectedDonation(donation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDonation(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'reserved':
        return 'warning';
      case 'collected':
        return 'info';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Donations
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          View and manage your food donations
        </Typography>

        <Grid container spacing={3}>
          {donations.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation._id}>
              <Card>
                {donation.images && donation.images[0] && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={donation.images[0]}
                    alt={donation.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {donation.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {donation.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={donation.foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                      color={donation.foodType === 'veg' ? 'success' : 'error'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={donation.status}
                      color={getStatusColor(donation.status)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2">
                    Quantity: {donation.quantity} {donation.unit}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expires: {new Date(donation.expiryDate).toLocaleString()}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenDialog(donation)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          {selectedDonation && (
            <>
              <DialogTitle>{selectedDonation.title}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1" paragraph>
                      {selectedDonation.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Food Type</Typography>
                    <Typography variant="body1">
                      {selectedDonation.foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Status</Typography>
                    <Typography variant="body1">
                      {selectedDonation.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Quantity</Typography>
                    <Typography variant="body1">
                      {selectedDonation.quantity} {selectedDonation.unit}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Expiry Date</Typography>
                    <Typography variant="body1">
                      {new Date(selectedDonation.expiryDate).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Pickup Address</Typography>
                    <Typography variant="body1">
                      {selectedDonation.pickupAddress.street}
                      <br />
                      {selectedDonation.pickupAddress.city}, {selectedDonation.pickupAddress.state}
                      <br />
                      {selectedDonation.pickupAddress.zipCode}
                    </Typography>
                  </Grid>
                  {selectedDonation.pickupInstructions && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Pickup Instructions</Typography>
                      <Typography variant="body1">
                        {selectedDonation.pickupInstructions}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
};

export default MyDonations; 