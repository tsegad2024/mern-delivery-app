// routes/shop.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import * as shopController from '../controllers/shopController.js';

const router = express.Router();

// User requests to become seller
router.post('/request-shop', verifyToken, shopController.requestShop);

// Admin views pending requests
router.get('/pending-requests', verifyToken, requireRole('admin'), shopController.getPendingRequests);

// Admin approves request
router.post('/approve-request', verifyToken, requireRole('admin'), shopController.approveShopRequest);

// Admin rejects request
router.post('/reject-request', verifyToken, requireRole('admin'), shopController.rejectShopRequest);

export default router;