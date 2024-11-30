import { Hono } from 'hono';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('lms.db');
const app = new Hono();

// Hent alle kurs
app.get('/courses', async (c) => {
  return new Promise((resolve) => {
    db.all('SELECT * FROM courses', (err, rows) => {
      if (err) {
        resolve(c.json({ error: err.message }, 500));
      }
      resolve(c.json(rows));
    });
  });
});

// Legg til nytt kurs
app.post('/courses', async (c) => {
  const { title, description, category } = await c.req.json();
  return new Promise((resolve) => {
    db.run(
      'INSERT INTO courses (title, description, category) VALUES (?, ?, ?)',
      [title, description, category],
      function (err) {
        if (err) {
          resolve(c.json({ error: err.message }, 500));
        }
        resolve(c.json({ id: this.lastID }));
      }
    );
  });
});

// Slett kurs (inkludert tilhørende leksjoner og kommentarer)
app.delete('/courses/:id', async (c) => {
  const { id } = c.req.param(); // Henter kurs-ID fra URL

  return new Promise((resolve) => {
    db.serialize(() => {
      // Slett leksjoner tilknyttet kurset
      db.run('DELETE FROM lessons WHERE course_id = ?', [id], function (err) {
        if (err) {
          resolve(c.json({ error: err.message }, 500));
          return;
        }
        
        // Slett kommentarer tilknyttet kurset
        db.run('DELETE FROM comments WHERE course_id = ?', [id], function (err) {
          if (err) {
            resolve(c.json({ error: err.message }, 500));
            return;
          }
          
          // Slett selve kurset
          db.run('DELETE FROM courses WHERE id = ?', [id], function (err) {
            if (err) {
              resolve(c.json({ error: err.message }, 500));
            } else {
              resolve(c.json({ message: 'Course and related data deleted successfully' }));
            }
          });
        });
      });
    });
  });
});

// Test-route for å sjekke om serveren fungerer
app.get('/', (c) => c.text('LMS Backend is running!'));

export default app;