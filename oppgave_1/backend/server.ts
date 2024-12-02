import { Hono } from 'hono';
import { sqlite } from 'sqlite3';

const app = new Hono();

// Initialiser SQLite-database
const db = new sqlite.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected');
  }
});

// Opprett kurs og leksjoner-tabeller (om de ikke eksisterer)
db.run(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY(courseId) REFERENCES courses(id)
  )
`);

// Definer API-ruter for kurs
app.get('/courses', (c) => {
  return new Promise((resolve) => {
    db.all("SELECT * FROM courses", (err, rows) => {
      resolve(c.json(rows));
    });
  });
});

// API for å opprette kurs
app.post('/courses', async (c) => {
  const { title, category } = await c.req.json();
  return new Promise((resolve) => {
    db.run("INSERT INTO courses (title, category) VALUES (?, ?)", [title, category], (err) => {
      if (err) {
        resolve(c.json({ error: 'Failed to add course' }, 500));
      } else {
        resolve(c.json({ success: 'Course added' }));
      }
    });
  });
});

// Definer API-ruter for leksjoner
app.get('/lessons/:courseId', (c) => {
  const courseId = c.req.param('courseId');
  return new Promise((resolve) => {
    db.all("SELECT * FROM lessons WHERE courseId = ?", [courseId], (err, rows) => {
      resolve(c.json(rows));
    });
  });
});

// API for å opprette leksjoner
app.post('/lessons', async (c) => {
  const { courseId, title, content } = await c.req.json();
  return new Promise((resolve) => {
    db.run("INSERT INTO lessons (courseId, title, content) VALUES (?, ?, ?)", [courseId, title, content], (err) => {
      if (err) {
        resolve(c.json({ error: 'Failed to add lesson' }, 500));
      } else {
        resolve(c.json({ success: 'Lesson added' }));
      }
    });
  });
});

app.listen(4000);