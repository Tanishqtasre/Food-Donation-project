const express = require('express');
const router = express.Router();
const Organization = require('../models/organizationModel');
const auth = require('../middleware/auth');

// Create a new organization
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      address,
      phone,
      email,
      website,
      operatingHours,
      acceptedFoodTypes
    } = req.body;

    const organization = new Organization({
      name,
      type,
      description,
      address,
      phone,
      email,
      website,
      operatingHours,
      acceptedFoodTypes
    });

    await organization.save();
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all organizations
router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.find()
      .sort({ name: 1 });
    res.json(organizations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get organizations by type
router.get('/type/:type', async (req, res) => {
  try {
    const organizations = await Organization.find({ type: req.params.type })
      .sort({ name: 1 });
    res.json(organizations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single organization
router.get('/:id', async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update organization
router.put('/:id', auth, async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.json(organization);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete organization
router.delete('/:id', auth, async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    await organization.remove();
    res.json({ message: 'Organization removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 