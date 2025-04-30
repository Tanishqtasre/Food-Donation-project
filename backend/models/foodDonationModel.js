const mongoose = require('mongoose');

const foodDonationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'liters', 'pieces', 'plates']
  },
  expiryDate: {
    type: Date,
    required: true
  },
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'collected', 'delivered'],
    default: 'available'
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  images: [{
    type: String
  }],
  dietaryRestrictions: [{
    type: String
  }],
  specialInstructions: {
    type: String
  }
}, {
  timestamps: true
});

// Index for geospatial queries
foodDonationSchema.index({ 'pickupAddress.coordinates': '2dsphere' });

const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);

module.exports = FoodDonation; 