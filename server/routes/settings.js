import express from 'express';
import { readDb, writeDb } from '../data/db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get store settings
router.get('/', (req, res) => {
  const db = readDb();
  res.json({ success: true, settings: db?.settings || {} });
});

// Protected: Update store settings
router.put('/admin', authenticateAdmin, (req, res) => {
  const db = readDb();
  if (!db) return res.status(500).json({ success: false, message: 'Database error' });

  db.settings = {
    ...db.settings,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  writeDb(db);
  res.json({ success: true, message: 'Store settings updated successfully.', settings: db.settings });
});

export default router;
