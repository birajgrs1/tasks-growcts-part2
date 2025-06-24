import express from 'express';
import { getEmployees, terminateEmployee } from '../controllers/employeeController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();


router.get('/', isAuthenticated, getEmployees);
router.get('/terminate/:id', isAuthenticated, requireRole('HR'), terminateEmployee);

export default router;
