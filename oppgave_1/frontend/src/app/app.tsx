import { Hono } from 'hono';
import { users } from './data';

const app = new Hono();

// Get all users
app.get('/users', (c) => {
  return c.json(users);
});

// Get a single user by ID
app.get('/users/:id', (c) => {
  const userId = c.req.param('id');
  const user = users.find((u) => u.id === userId);

  if (user) {
    return c.json(user);
  } else {
    return c.json({ message: 'User not found' }, 404);
  }
});

export default app;
