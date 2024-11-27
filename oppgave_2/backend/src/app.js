const express = require('express');
const bodyParser = require('body-parser');
const arrangementRoutes = require('./routes/arrangements');

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Routes
app.use('/api/arrangements', arrangementsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
