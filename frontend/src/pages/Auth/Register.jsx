import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'donor',
    contributorType: 'individual', // individual, restaurant, event
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    aadharNumber: '',
    aadharFile: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested address fields
    if (name.includes('address.')) {
      const field = name.split('.')[1]; // Get the field name (street, city, state, zipCode)
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
      // Clear error when user starts typing
      if (errors.address) {
        setErrors(prev => ({
          ...prev,
          address: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          aadharFile: 'File size should be less than 2MB'
        }));
        return;
      }
      // Validate file type
      if (!file.type.match(/image\/(jpeg|png)/)) {
        setErrors(prev => ({
          ...prev,
          aadharFile: 'Please upload a valid image (JPEG or PNG)'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        aadharFile: file
      }));
      setErrors(prev => ({
        ...prev,
        aadharFile: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    // Frontend validation
    const newErrors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name (minimum 2 characters)';
    }
    
    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)/)) {
      newErrors.password = 'Password must contain at least one letter and one number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone || !formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.aadharNumber || !formData.aadharNumber.match(/^\d{12}$/)) {
      newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
    }
    
    if (!formData.address || !formData.address.street || !formData.address.city || 
        !formData.address.state || !formData.address.zipCode) {
      newErrors.address = 'Please provide complete address details';
    } else if (!formData.address.zipCode.match(/^\d{6}$/)) {
      newErrors.address = 'Please enter a valid 6-digit ZIP code';
    }
    
    if (!formData.aadharFile) {
      newErrors.aadharFile = 'Please upload your Aadhar card image';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors:', newErrors);
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('role', formData.role);
      formDataToSend.append('contributorType', formData.contributorType);
      formDataToSend.append('aadharNumber', formData.aadharNumber.trim());
      formDataToSend.append('address', JSON.stringify({
        street: formData.address.street.trim(),
        city: formData.address.city.trim(),
        state: formData.address.state.trim(),
        zipCode: formData.address.zipCode.trim()
      }));
      
      if (formData.aadharFile) {
        formDataToSend.append('aadharFile', formData.aadharFile);
      }
      
      console.log('Sending registration request...');
      console.log('FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      const response = await axios.post('http://localhost:5000/api/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data) {
        setSuccess('Registration successful! Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // Handle validation errors from backend
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          setErrors({ submit: error.response.data.message });
        }
      } else if (error.request) {
        setErrors({ submit: 'No response from server. Please try again.' });
      } else {
        setErrors({ submit: 'An error occurred during registration. Please try again.' });
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
          Register as a Contributor
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
            <Grid item xs={12} sm={6}>
              {renderTextField('password', 'Password', 'password')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('confirmPassword', 'Confirm Password', 'password')}
            </Grid>
            <Grid item xs={12}>
              {renderTextField('phone', 'Phone Number')}
            </Grid>
            <Grid item xs={12}>
              {renderTextField('aadharNumber', 'Aadhar Number')}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Role"
                >
                  <MenuItem value="donor">Donor</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Contributor Type</InputLabel>
                <Select
                  name="contributorType"
                  value={formData.contributorType}
                  onChange={handleChange}
                  label="Contributor Type"
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="restaurant">Restaurant</MenuItem>
                  <MenuItem value="catering">Catering</MenuItem>
                  <MenuItem value="hotel">Hotel</MenuItem>
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
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="aadhar-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="aadhar-file">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Upload Aadhar Card
                  </Button>
                </label>
                {formData.aadharFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {formData.aadharFile.name}
                  </Typography>
                )}
                {errors.aadharFile && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.aadharFile}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 