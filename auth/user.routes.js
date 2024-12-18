import express from 'express';
import {registerUser, loginUser} from './user.controller.js';

const router = express.Router();

// Route Register
router.post('/register', registerUser);

// Route Login
router.post('/login', loginUser);

export default router;