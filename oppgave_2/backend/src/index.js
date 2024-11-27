import express from 'express';
import cors from 'cors';
import arrangementsRoutes from './src/arrangements.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/arrangements', arrangementsRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
