// src/routes/userRoutes.js
import express from 'express';
import { signUp, login } from '../controllers/userController.js';  // Make sure these match
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';

const router = express.Router();

// Signup route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

export default router;
