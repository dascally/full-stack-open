require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const blogsRouter = require('./routes/blogs.js');

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to database.');
});

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT ?? 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
