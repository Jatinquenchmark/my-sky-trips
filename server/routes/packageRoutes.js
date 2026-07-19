import express from 'express';
import {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  getDashboardStats,
} from '../controllers/packageController.js';

import upload from '../middleware/upload.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

import { imagekitUpload } from '../middleware/imagekitUpload.js';

const router = express.Router();

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackage);

// Protected Admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard/stats', getDashboardStats);
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'galleryFiles', maxCount: 10 }]), imagekitUpload, createPackage);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'galleryFiles', maxCount: 10 }]), imagekitUpload, updatePackage);
router.delete('/:id', deletePackage);

export default router;
