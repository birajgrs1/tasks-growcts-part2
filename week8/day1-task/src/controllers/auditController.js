import AuditLog from '../models/AuditLog.js';

export const getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find().sort({ timestamp: -1 });
  res.json(logs);
};
