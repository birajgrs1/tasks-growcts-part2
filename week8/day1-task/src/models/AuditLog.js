import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  dataBefore: {
    type: Object,
    default: {}
  },
  dataAfter: {
    type: Object,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('AuditLog', auditLogSchema);
