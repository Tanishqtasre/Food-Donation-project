const express = require('express');
const Volunteer = require('../models/volunteerModel');
const auth = require('../middleware/auth');

const router = express.Router();

// Register as a volunteer
router.post('/register', auth, async (req, res) => {
  try {
    const { name, email, phone, address, availability, vehicle, aadharNumber } = req.body;

    // Check if user is already registered as a volunteer
    const existingVolunteer = await Volunteer.findOne({ userId: req.user._id });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'You are already registered as a volunteer' });
    }

    // Check if email or Aadhar number is already in use
    const existingEmail = await Volunteer.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const existingAadhar = await Volunteer.findOne({ aadharNumber });
    if (existingAadhar) {
      return res.status(400).json({ message: 'Aadhar number is already registered' });
    }

    const volunteer = new Volunteer({
      userId: req.user._id,
      name,
      email,
      phone,
      address,
      availability,
      vehicle,
      aadharNumber
    });

    await volunteer.save();

    res.status(201).json({
      message: 'Volunteer registration successful',
      volunteer
    });
  } catch (error) {
    console.error('Volunteer registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get volunteer profile
router.get('/profile', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ userId: req.user._id })
      .populate('assignedTasks')
      .populate('completedTasks');

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer profile not found' });
    }

    res.json(volunteer);
  } catch (error) {
    console.error('Get volunteer profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update volunteer profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, address, availability, vehicle } = req.body;

    const volunteer = await Volunteer.findOne({ userId: req.user._id });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer profile not found' });
    }

    volunteer.name = name || volunteer.name;
    volunteer.phone = phone || volunteer.phone;
    volunteer.address = address || volunteer.address;
    volunteer.availability = availability || volunteer.availability;
    volunteer.vehicle = vehicle || volunteer.vehicle;

    await volunteer.save();

    res.json({
      message: 'Profile updated successfully',
      volunteer
    });
  } catch (error) {
    console.error('Update volunteer profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all volunteers (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const volunteers = await Volunteer.find()
      .populate('userId', 'name email')
      .populate('assignedTasks')
      .populate('completedTasks');

    res.json(volunteers);
  } catch (error) {
    console.error('Get all volunteers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign task to volunteer (admin only)
router.post('/:volunteerId/assign-task', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { taskId } = req.body;
    const volunteer = await Volunteer.findById(req.params.volunteerId);

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    if (volunteer.assignedTasks.includes(taskId)) {
      return res.status(400).json({ message: 'Task already assigned to this volunteer' });
    }

    volunteer.assignedTasks.push(taskId);
    await volunteer.save();

    res.json({
      message: 'Task assigned successfully',
      volunteer
    });
  } catch (error) {
    console.error('Assign task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete task (volunteer)
router.post('/complete-task/:taskId', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ userId: req.user._id });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer profile not found' });
    }

    const taskId = req.params.taskId;
    if (!volunteer.assignedTasks.includes(taskId)) {
      return res.status(400).json({ message: 'Task not assigned to this volunteer' });
    }

    // Remove from assigned tasks and add to completed tasks
    volunteer.assignedTasks = volunteer.assignedTasks.filter(id => id.toString() !== taskId);
    volunteer.completedTasks.push(taskId);

    await volunteer.save();

    res.json({
      message: 'Task marked as completed',
      volunteer
    });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 