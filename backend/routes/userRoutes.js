const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'aadhar');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Register a new user
router.post('/register', upload.single('aadharFile'), async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    console.log('Registration file:', req.file);

    const { name, email, password, phone, role, contributorType, aadharNumber } = req.body;
    
    // Trim all input values
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedAadharNumber = aadharNumber?.trim();
    
    // Detailed validation
    const errors = {};
    
    // Validate name
    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Please enter a valid name (minimum 2 characters)';
    }

    // Validate email
    if (!trimmedEmail || !trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)/)) {
      errors.password = 'Password must contain at least one letter and one number';
    }

    // Validate phone
    if (!trimmedPhone || !trimmedPhone.match(/^\d{10}$/)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Validate Aadhar number
    if (!trimmedAadharNumber || !trimmedAadharNumber.match(/^\d{12}$/)) {
      errors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
    }

    // Address validation
    let address = req.body.address;
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch (e) {
        errors.address = 'Invalid address format';
      }
    }

    if (!address || !address.street || !address.city || !address.state || !address.zipCode) {
      errors.address = 'Please provide complete address details';
    } else if (!address.zipCode.match(/^\d{6}$/)) {
      errors.address = 'Please enter a valid 6-digit ZIP code';
    }

    // Validate Aadhar file
    if (!req.file) {
      errors.aadharFile = 'Please upload your Aadhar card image';
    }

    // Check for validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: 'This email is already registered. Please use a different email or try logging in.',
        field: 'email'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'donor',
      contributorType: contributorType || 'individual',
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.zipCode
      },
      aadharNumber,
      aadharFile: req.file ? req.file.path : null
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contributorType: user.contributorType,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Failed to create user. Please try again.' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'An error occurred during registration. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'No account found with this email address' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate token and send response
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contributorType: user.contributorType,
      token: token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'An error occurred during login. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout user
router.post('/logout', auth, async (req, res) => {
  try {
    // In a stateless JWT system, we don't need to do anything on the server
    // The client will remove the token from localStorage
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create test user route
router.post('/create-test-user', async (req, res) => {
  try {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test1234',
      phone: '1234567890',
      role: 'donor',
      contributorType: 'individual',
      address: {
        street: 'Test Street',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456'
      },
      aadharNumber: '123456789012'
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Test user already exists' });
    }

    // Create new user
    const user = await User.create(testUser);
    res.status(201).json({
      message: 'Test user created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({ 
      message: 'Error creating test user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 