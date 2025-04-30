import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'weekends'],
    default: 'part-time'
  },
  vehicle: {
    type: String,
    enum: ['none', 'bike', 'car'],
    default: 'none'
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  assignedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodDonation'
  }],
  completedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodDonation'
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer; 