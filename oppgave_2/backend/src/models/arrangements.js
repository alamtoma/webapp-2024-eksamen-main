import express from 'express';
import db from './database.js';

const router = express.Router();

// GET: Fetch all arrangements
router.get('/', (req, res) => {
    const arrangements = db.prepare('SELECT * FROM arrangements').all();
    res.json(arrangements);
});

// POST: Create a new arrangement
router.post('/', (req, res) => {
    const { title, type, date, maxParticipants, price, description } = req.body;

    if (!title || !type || !date || !maxParticipants || !price) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const stmt = db.prepare(`
      INSERT INTO arrangements (title, type, date, maxParticipants, price, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(title, type, date, maxParticipants, price, description);

    const newArrangement = db.prepare('SELECT * FROM arrangements WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newArrangement);
});

export default router;
