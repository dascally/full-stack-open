const express = require('express');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const app = express();

const blogsRouter = require('./controllers/blogs');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  next(err);
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
};

start();
