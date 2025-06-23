import express from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();
router.get('/', isAuthenticated, requireRole('admin'), getAuditLogs);

export default router;
