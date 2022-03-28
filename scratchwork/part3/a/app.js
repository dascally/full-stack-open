const config = require('./utils/config.js');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes.js');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger.js');
const mongoose = require('mongoose');

logger.info(`Connecting to: ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to database.');
  })
  .catch((err) => {
    logger.error(`Error connecting to database: ${err.message}`);
  });

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
