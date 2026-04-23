import express from 'express';
import {
  getActivities,
  getAllActivitiesAdmin,
  bookActivities,
  resetActivitySeats,
  resetAllSeats,
  updateActivity,
  createActivity,
  deleteActivity,
  seedActivities,
} from '../controllers/activityController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Public ──────────────────────────────────────────────
router.get('/', getActivities);          // Matches /api/water-activities/
router.get('', getActivities);           // Matches /api/water-activities
router.post('/book', bookActivities);    // Frontend: reserve seats (called before payment)

// ── Admin Only ───────────────────────────────────────────
router.use(protect);
router.use(authorize('admin'));

router.get('/admin', getAllActivitiesAdmin);
router.post('/seed', seedActivities);
router.post('/create', createActivity);
router.put('/reset-all', resetAllSeats);
router.put('/:id/reset', resetActivitySeats);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;
