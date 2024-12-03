import { Hono } from 'hono';
import db from './database';

const app = new Hono();

// Get all courses
app.get('/courses', async (ctx) => {
  const courses = await db.all('SELECT * FROM courses');
  return ctx.json(courses);
});

// Create a new course
app.post('/courses', async (ctx) => {
  const { title, description, category } = await ctx.req.json();
  await db.run('INSERT INTO courses (title, description, category) VALUES (?, ?, ?)', [title, description, category]);
  return ctx.json({ message: 'Course created!' });
});

// Delete a course and its associated lessons and comments
app.delete('/courses/:id', async (ctx) => {
  const courseId = ctx.req.param('id');
  await db.run('DELETE FROM comments WHERE lesson_id IN (SELECT id FROM lessons WHERE course_id = ?)', [courseId]);
  await db.run('DELETE FROM lessons WHERE course_id = ?', [courseId]);
  await db.run('DELETE FROM courses WHERE id = ?', [courseId]);
  return ctx.json({ message: 'Course and related data deleted!' });
});

export default app;