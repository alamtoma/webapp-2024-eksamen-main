import { Request, Response } from 'express';
import { connectToDatabase } from '../../lib/database';

export const exampleController = {
  getExample: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase();
      const rows = await db.all('SELECT * FROM examples');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching examples:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addExample: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const db = await connectToDatabase();
      await db.run('INSERT INTO examples (name) VALUES (?)', [name]);
      res.status(201).json({ message: 'Example added' });
    } catch (error) {
      console.error('Error adding example:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
