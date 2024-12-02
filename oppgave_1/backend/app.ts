import { Hono } from 'hono';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('lms.db');
const app = new Hono();
const courses = [db]
const comments = [db]

app.get('/api/courses', (c) => c.json(courses));

app.get('/api/courses/:slug', (c) => {
  const course = courses.find((course) => course.slug === c.req.param('slug'));
  return course ? c.json(course) : c.json({ error: 'Course not found' }, 404);
});

app.get('/api/courses/:courseSlug/lessons/:lessonSlug', (c) => {
  const { courseSlug, lessonSlug } = c.req.param();
  const course = courses.find((course) => course.slug === courseSlug);
  if (!course) return c.json({ error: 'Course not found' }, 404);
  const lesson = course.lessons.find((lesson) => lesson.slug === lessonSlug);
  return lesson ? c.json(lesson) : c.json({ error: 'Lesson not found' }, 404);
});

app.get('/api/comments', (c) => {
  const lessonSlug = c.req.query('lessonSlug');
  const lessonComments = comments.filter((comment) => comment.lesson.slug === lessonSlug);
  return c.json(lessonComments);
});

app.post('/api/comments', async (c) => {
  const comment = await c.req.json();
  comments.push(comment);
  return c.json({ message: 'Comment added successfully' });
});

export default app;

//Brukt chatgpt til å feilsjekke, rydde og rette opp i ting her og der og overalt. Blandt annet 