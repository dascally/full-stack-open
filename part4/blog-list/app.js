const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware.js');
const blogsRouter = require('./routes/blogs.js');
const usersRouter = require('./routes/users.js');
const loginRouter = require('./routes/login.js');

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

app.use('/api/blogs', middleware.tokenExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing.js');
  app.use('/api/testing', testingRouter);
}

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'AuthError') {
    return res.status(401).json({ error: err.message });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: err.message });
  }

  return next(err);
});

module.exports = app;
