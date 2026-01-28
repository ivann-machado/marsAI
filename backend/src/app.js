const express = require("express");
const cors = require("cors");
const config = require("./config");
// const authRoutes = require('./routes/auth.routes');

const app = express();

//  Middleware
app.use(cors(config.CORS_OPTIONS));
app.use(express.json());

// Public routes
app.get("/", (req, res) => {
  res.json({ message: "" });
});
// app.use('/api', authRoutes);

// Protected routes

module.exports = app;
