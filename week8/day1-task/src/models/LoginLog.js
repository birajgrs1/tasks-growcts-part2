import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('LoginLog', loginLogSchema);
