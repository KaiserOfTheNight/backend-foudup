import express from 'express';
import { 
  getProfile,
  updateProfile,
  getUserProjects
} from '../controllers/user.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', protectedRoute, getProfile);
router.put('/profile', protectedRoute, updateProfile);
router.get('/projects', protectedRoute, getUserProjects);

export default router;