const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the organization name'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Please specify the organization type'],
    enum: ['food_bank', 'charity', 'shelter', 'community_center']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  operatingHours: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    open: String,
    close: String
  }],
  capacity: {
    type: Number,
    required: [true, 'Please specify the storage capacity']
  },
  currentStorage: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  documents: [{
    type: {
      type: String,
      enum: ['license', 'certification', 'tax_document', 'other']
    },
    url: String,
    verified: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for geospatial queries
organizationSchema.index({ 'address.coordinates': '2dsphere' });

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization; 