import express from 'express';
import {
  getContacts, getContact, createContact,
  updateContact, deleteContact
} from '../controllers/contactController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
import { contactCreateValidation, contactUpdateValidation } from '../middleware/validators.js';

const router = express.Router();

router.get('/', authenticate, getContacts);
router.get('/:id', authenticate, getContact);
router.post('/', authenticate, upload.single('photo'), contactCreateValidation, createContact);
router.patch('/:id', authenticate, upload.single('photo'), contactUpdateValidation, updateContact);
router.delete('/:id', authenticate, deleteContact);

export default router;
