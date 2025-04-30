import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { volunteerAPI } from '../../services/api';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    availability: 'part-time',
    vehicle: 'none',
    aadharNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.aadharNumber) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
    }
    
    if (!formData.address.street) {
      newErrors.address = 'Street address is required';
    }
    
    if (!formData.address.city) {
      newErrors.address = 'City is required';
    }
    
    if (!formData.address.state) {
      newErrors.address = 'State is required';
    }
    
    if (!formData.address.zipCode) {
      newErrors.address = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(formData.address.zipCode)) {
      newErrors.address = 'Please enter a valid 6-digit ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      const response = await volunteerAPI.register({
        ...formData,
        userId: user._id // Link the volunteer profile to the user
      });

      if (response.data) {
        setSuccess('Volunteer registration successful!');
        setTimeout(() => {
          navigate('/volunteer/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Volunteer registration error:', err);
      if (err.response?.data?.message) {
        setErrors({ submit: err.response.data.message });
      } else {
        setErrors({ submit: 'Failed to register as volunteer. Please try again.' });
      }
    }
  };

  const renderTextField = (name, label, type = 'text', required = true) => (
    <TextField
      fullWidth
      required={required}
      name={name}
      label={label}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
      sx={{ mb: 2 }}
    />
  );

  const renderAddressField = (field, label) => (
    <TextField
      fullWidth
      required
      name={`address.${field}`}
      label={label}
      value={formData.address[field]}
      onChange={handleChange}
      error={!!errors.address}
      helperText={errors.address}
      sx={{ mb: 2 }}
    />
  );

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Join as a Volunteer
        </Typography>
        {errors.submit && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {errors.submit}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {renderTextField('name', 'Full Name')}
            </Grid>
            <Grid item xs={12}>
              {renderTextField('email', 'Email Address')}
            </Grid>
            <Grid item xs={12}>
              {renderTextField('phone', 'Phone Number')}
            </Grid>
            <Grid item xs={12}>
              {renderTextField('aadharNumber', 'Aadhar Number')}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  label="Availability"
                >
                  <MenuItem value="full-time">Full Time</MenuItem>
                  <MenuItem value="part-time">Part Time</MenuItem>
                  <MenuItem value="weekends">Weekends Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vehicle</InputLabel>
                <Select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  label="Vehicle"
                >
                  <MenuItem value="none">No Vehicle</MenuItem>
                  <MenuItem value="bike">Bike</MenuItem>
                  <MenuItem value="car">Car</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {renderAddressField('street', 'Street Address')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderAddressField('city', 'City')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderAddressField('state', 'State')}
            </Grid>
            <Grid item xs={12}>
              {renderAddressField('zipCode', 'ZIP Code')}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register as Volunteer
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default VolunteerForm; 