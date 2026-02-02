const express = require('express');
const cors = require('cors');
const filmRoutes = require('./routes/film.route');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/films', filmRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API MarsAI OK' });
});

module.exports = app;
