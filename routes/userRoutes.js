import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
import { profileUpdateValidation } from '../middleware/validators.js';

const router = express.Router();

// GET profile — no validation
router.get('/profile', authenticate, getProfile);

// PATCH profile — with file upload and validation
router.patch(
  '/profile',
  authenticate,
  upload.single('photo'),
  profileUpdateValidation,
  updateProfile
);

export default router;
