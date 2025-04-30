const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

const testUser = {
  name: 'Test User',
  email: 'vivekdhakad2404@gmail.com',
  password: 'abcd1234',
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

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('User already exists with this email');
      process.exit(0);
    }

    // Create new user
    const user = await User.create(testUser);
    console.log('Test user created successfully:', {
      id: user._id,
      name: user.name,
      email: user.email
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser(); 