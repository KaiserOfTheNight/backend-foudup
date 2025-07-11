import express from 'express';
import { 
  createProject, 
  getProjects, 
  getProject, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protectedRoute, createProject);
router.get('/', protectedRoute, getProjects);
router.get('/:id', protectedRoute, getProject);
router.put('/:id', protectedRoute, updateProject);
router.delete('/:id', protectedRoute, deleteProject);

export default router;