import express from 'express';
import { exampleController } from './features/example/exampleController';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/examples', exampleController.getExample);
app.post('/api/examples', exampleController.addExample);

export { app };
