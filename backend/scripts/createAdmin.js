const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Admin user details
    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123', // You should change this after first login
      phone: '1234567890',
      role: 'admin',
      contributorType: 'individual',
      address: {
        street: 'Admin Street',
        city: 'Admin City',
        state: 'Admin State',
        pincode: '123456'
      },
      aadharNumber: '123456789012'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(1);
    }

    // Create admin user
    const user = await User.create(adminUser);
    console.log('Admin user created successfully:', {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin(); 