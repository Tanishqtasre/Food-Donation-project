const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/userModel');
const FoodDonation = require('../models/foodDonationModel');
const Organization = require('../models/organizationModel');

// Get all users (admin only)
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all food donations (admin only)
router.get('/food-donations', auth, admin, async (req, res) => {
  try {
    const donations = await FoodDonation.find()
      .populate('donor', 'name email')
      .populate('organization', 'name');
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all organizations (admin only)
router.get('/organizations', auth, admin, async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user status (admin only)
router.put('/users/:id/status', auth, admin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = isActive;
    await user.save();

    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update organization status (admin only)
router.put('/organizations/:id/status', auth, admin, async (req, res) => {
  try {
    const { isVerified } = req.body;
    const organization = await Organization.findById(req.params.id);
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    organization.isVerified = isVerified;
    await organization.save();

    res.json({ message: 'Organization status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 