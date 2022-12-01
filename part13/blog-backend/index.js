const express = require('express');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const app = express();

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  if (err.name === 'SequelizeValidationError') {
    err.errors = err.errors.map((error) => error.message);
    res.status(400).json(err);
  }
  next(err);
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
};

start();
