import { Hono } from 'hono';
import { sqlite } from 'sqlite3';

const app = new Hono();

// Initialiserer SQLite-database
const db = new sqlite.Database('./database.db', (err: any) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected');
  }
});

// Oppretter kurs og leksjoner-tabeller (om de ikke eksisterer)
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
app.get('/courses', (c: { json: (arg0: any) => unknown; }) => {
  return new Promise((resolve) => {
    db.all("SELECT * FROM courses", (err: any, rows: any) => {
      resolve(c.json(rows));
    });
  });
});

// API for å opprette kurs
app.post('/courses', async (c: { req: { json: () => PromiseLike<{ title: any; category: any; }> | { title: any; category: any; }; }; json: (arg0: { error?: string; success?: string; }, arg1: number | undefined) => unknown; }) => {
  const { title, category } = await c.req.json();
  return new Promise((resolve) => {
    db.run("INSERT INTO courses (title, category) VALUES (?, ?)", [title, category], (err: any) => {
      if (err) {
        resolve(c.json({ error: 'Failed to add course' }, 500));
      } else {
        resolve(c.json({ success: 'Course added' }));
      }
    });
  });
});

// Definer API-ruter for leksjoner
app.get('/lessons/:courseId', (c: { req: { param: (arg0: string) => any; }; json: (arg0: any) => unknown; }) => {
  const courseId = c.req.param('courseId');
  return new Promise((resolve) => {
    db.all("SELECT * FROM lessons WHERE courseId = ?", [courseId], (err: any, rows: any) => {
      resolve(c.json(rows));
    });
  });
});

// API for å opprette leksjoner
app.post('/lessons', async (c: { req: { json: () => PromiseLike<{ courseId: any; title: any; content: any; }> | { courseId: any; title: any; content: any; }; }; json: (arg0: { error?: string; success?: string; }, arg1: number | undefined) => unknown; }) => {
  const { courseId, title, content } = await c.req.json();
  return new Promise((resolve) => {
    db.run("INSERT INTO lessons (courseId, title, content) VALUES (?, ?, ?)", [courseId, title, content], (err: any) => {
      if (err) {
        resolve(c.json({ error: 'Failed to add lesson' }, 500));
      } else {
        resolve(c.json({ success: 'Lesson added' }));
      }
    });
  });
});

app.listen(4000);