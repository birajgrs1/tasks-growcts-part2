import AuditLog from '../models/AuditLog.js';

export const logAudit = (action, target, dataBefore, dataAfter) => async (req, res, next) => {
  await AuditLog.create({
    actor: req.user._id,
    action,
    target,
    dataBefore,
    dataAfter,
    ip: req.ip,
    endpoint: req.originalUrl
  });
  next();
};
