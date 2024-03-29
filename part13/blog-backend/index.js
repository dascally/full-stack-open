const express = require('express');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const app = express();

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const readinglistsRouter = require('./controllers/reading_lists');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readinglistsRouter);
app.use((err, req, res, next) => {
  console.error(`ERROR: ${err.message}`, JSON.stringify(err, null, 2));
  if (err.name === 'SequelizeValidationError') {
    err.errors = err.errors.map((error) => error.message);
    res.status(400).json(err);
  }
  if (err.name === 'SequelizeDatabaseError') {
    res.status(400).json({ error: err.message });
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
