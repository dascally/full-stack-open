const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./routes/blogs.js');

const MONGODB_URI = require('./utils/config.js').MONGODB_URI;
const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to database.');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
