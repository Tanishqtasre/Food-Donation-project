const express = require('express');
const router = express.Router();
const Transaction = require('../models/donationTransactionModel');
const FoodDonation = require('../models/foodDonationModel');
const Organization = require('../models/organizationModel');
const auth = require('../middleware/auth');

// Create a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const {
      donationId,
      organizationId,
      pickupTime,
      status,
      notes
    } = req.body;

    // Verify donation exists and is available
    const donation = await FoodDonation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation is not available' });
    }

    // Verify organization exists
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const transaction = new Transaction({
      donation: donationId,
      organization: organizationId,
      donor: donation.donor,
      pickupTime,
      status: status || 'pending',
      notes
    });

    await transaction.save();

    // Update donation status
    donation.status = 'reserved';
    await donation.save();

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('donation')
      .populate('organization')
      .populate('donor', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's transactions (as donor)
router.get('/my-donations', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ donor: req.user.id })
      .populate('donation')
      .populate('organization')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get organization's transactions
router.get('/organization/:orgId', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ organization: req.params.orgId })
      .populate('donation')
      .populate('donor', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('donation')
      .populate('organization')
      .populate('donor', 'name email phone');
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update transaction status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update transaction status
    transaction.status = status;
    await transaction.save();

    // If transaction is completed or cancelled, update donation status
    if (status === 'completed' || status === 'cancelled') {
      const donation = await FoodDonation.findById(transaction.donation);
      if (donation) {
        donation.status = status === 'completed' ? 'completed' : 'available';
        await donation.save();
      }
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 