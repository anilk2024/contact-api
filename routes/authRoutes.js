import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import upload from '../middleware/upload.js';
import { registerValidation, loginValidation } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', upload.single('photo'), registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

export default router;
