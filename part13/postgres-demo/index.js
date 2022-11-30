const express = require('express');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const app = express();

const notesRouter = require('./controllers/notes');

app.use(express.json());

app.use('/api/notes', notesRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
};

start();
