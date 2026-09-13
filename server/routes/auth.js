import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDb, writeDb } from '../data/db.js';
import { authenticateAdmin } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cheema_jewels_super_secret_jwt_key_2026_luxury_secure_916';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Admin ID and Password are required.' });
  }

  const db = readDb();
  if (!db || !db.admin) {
    return res.status(500).json({ success: false, message: 'Database error. Please try again.' });
  }

  // Compare username (constant time check)
  if (username.trim() !== db.admin.username) {
    return res.status(401).json({ success: false, message: 'Invalid Admin ID or Password.' });
  }

  // Compare password against secure bcrypt hash
  const isMatch = bcrypt.compareSync(password, db.admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid Admin ID or Password.' });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      username: db.admin.username,
      role: db.admin.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Update last login timestamp
  db.admin.lastLogin = new Date().toISOString();
  writeDb(db);

  return res.json({
    success: true,
    message: 'Authentication successful. Welcome to CHEEMA JEWELS Command Centre.',
    token,
    user: {
      username: db.admin.username,
      role: db.admin.role,
      lastLogin: db.admin.lastLogin
    }
  });
});

router.get('/verify', authenticateAdmin, (req, res) => {
  const db = readDb();
  return res.json({
    success: true,
    user: {
      username: req.admin.username,
      role: req.admin.role,
      lastLogin: db?.admin?.lastLogin
    }
  });
});

export default router;
