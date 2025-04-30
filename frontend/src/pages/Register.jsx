import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, clearError } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'donor',
    contributorType: 'individual',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    aadharNumber: ''
  });
  const [aadharFile, setAadharFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    // Basic field validation
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone number must be 10 digits';
    
    // Address validation
    if (!formData.address.street.trim()) errors['address.street'] = 'Street address is required';
    if (!formData.address.city.trim()) errors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) errors['address.state'] = 'State is required';
    if (!formData.address.pincode.trim()) errors['address.pincode'] = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.address.pincode)) errors['address.pincode'] = 'Pincode must be 6 digits';
    
    // Aadhar validation
    if (!formData.aadharNumber.trim()) errors.aadharNumber = 'Aadhar number is required';
    else if (!/^\d{12}$/.test(formData.aadharNumber)) errors.aadharNumber = 'Aadhar number must be 12 digits';
    if (!aadharFile) errors.aadharFile = 'Aadhar card upload is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    // Clear validation error when field is modified
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setValidationErrors(prev => ({
          ...prev,
          aadharFile: 'File size must be less than 5MB'
        }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setValidationErrors(prev => ({
          ...prev,
          aadharFile: 'File must be an image'
        }));
        return;
      }
    }
    setAadharFile(file);
    setValidationErrors(prev => ({
      ...prev,
      aadharFile: undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    clearError();
    setValidationErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'address') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (aadharFile) {
        formDataToSend.append('aadharFile', aadharFile);
      }

      await register(formDataToSend);
      navigate('/');
    } catch (err) {
      if (err.message.includes('already exists')) {
        setError('This email is already registered. Please use a different email or try logging in.');
      } else if (err.message.includes('Invalid user data')) {
        setError('Please check all your information and try again.');
      } else {
        setError(err.message);
      }
    }
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] || '';
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {(error || authError) && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              error.includes('already registered') ? (
                <Button 
                  color="inherit" 
                  size="small"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              ) : null
            }
          >
            {error || authError}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!getFieldError('name')}
                helperText={getFieldError('name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!getFieldError('email')}
                helperText={getFieldError('email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!getFieldError('password')}
                helperText={getFieldError('password')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!getFieldError('phone')}
                helperText={getFieldError('phone')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="donor">Donor</MenuItem>
                <MenuItem value="organization">Organization</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Contributor Type"
                name="contributorType"
                value={formData.contributorType}
                onChange={handleChange}
                required
              >
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="restaurant">Restaurant</MenuItem>
                <MenuItem value="catering">Catering</MenuItem>
                <MenuItem value="hotel">Hotel</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                error={!!getFieldError('address.street')}
                helperText={getFieldError('address.street')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                error={!!getFieldError('address.city')}
                helperText={getFieldError('address.city')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                error={!!getFieldError('address.state')}
                helperText={getFieldError('address.state')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pincode"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                error={!!getFieldError('address.pincode')}
                helperText={getFieldError('address.pincode')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Aadhar Number"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                error={!!getFieldError('aadharNumber')}
                helperText={getFieldError('aadharNumber')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                error={!!getFieldError('aadharFile')}
              >
                Upload Aadhar Card
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {getFieldError('aadharFile') && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {getFieldError('aadharFile')}
                </Typography>
              )}
              {aadharFile && !getFieldError('aadharFile') && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {aadharFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register; 