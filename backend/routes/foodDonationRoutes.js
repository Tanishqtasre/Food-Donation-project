const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FoodDonation = require('../models/foodDonationModel');

// Create a new food donation
router.post('/', auth, async (req, res) => {
  try {
    const donation = await FoodDonation.create({
      ...req.body,
      donor: req.user._id
    });
    res.status(201).json(donation);
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all food donations
router.get('/', auth, async (req, res) => {
  try {
    const donations = await FoodDonation.find()
      .populate('donor', 'name email')
      .populate('organization', 'name');
    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single food donation
router.get('/:id', auth, async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id)
      .populate('donor', 'name email')
      .populate('organization', 'name');
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json(donation);
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a food donation
router.put('/:id', auth, async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Check if user is the donor or admin
    if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedDonation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedDonation);
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a food donation
router.delete('/:id', auth, async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Check if user is the donor or admin
    if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await donation.remove();
    res.json({ message: 'Donation removed' });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 