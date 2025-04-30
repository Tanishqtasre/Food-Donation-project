import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { foodDonationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DonateFood = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    foodType: 'veg',
    quantity: '',
    unit: 'servings',
    expiryDate: '',
    pickupAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    pickupInstructions: '',
    images: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'pickupAddress') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'images') {
          formData.images.forEach((file, index) => {
            formDataToSend.append(`images`, file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await foodDonationAPI.createDonation(formDataToSend);
      setSuccess('Food donation created successfully!');
      setTimeout(() => {
        navigate('/my-donations');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create donation');
    }
  };

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
          Donate Food
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
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
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">Food Type</Typography>
                <RadioGroup
                  row
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                >
                  <FormControlLabel value="veg" control={<Radio />} label="Vegetarian" />
                  <FormControlLabel value="non-veg" control={<Radio />} label="Non-Vegetarian" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="quantity"
                label="Quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  label="Unit"
                >
                  <MenuItem value="servings">Servings</MenuItem>
                  <MenuItem value="kg">Kilograms</MenuItem>
                  <MenuItem value="plates">Plates</MenuItem>
                  <MenuItem value="packets">Packets</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="datetime-local"
                name="expiryDate"
                label="Expiry Date/Time"
                value={formData.expiryDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          const input = document.querySelector('input[type="datetime-local"]');
                          if (input) input.showPicker();
                        }}
                      >
                        <CalendarTodayIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Pickup Address
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="pickupAddress.street"
                label="Street Address"
                value={formData.pickupAddress.street}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="pickupAddress.city"
                label="City"
                value={formData.pickupAddress.city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="pickupAddress.state"
                label="State"
                value={formData.pickupAddress.state}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="pickupAddress.zipCode"
                label="ZIP Code"
                value={formData.pickupAddress.zipCode}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                name="pickupInstructions"
                label="Pickup Instructions"
                value={formData.pickupInstructions}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Food Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              {formData.images.length > 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected {formData.images.length} image(s)
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Donation
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonateFood; 