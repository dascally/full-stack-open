require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog.js');

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to database.');
});

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.get('/api/blogs/:id', (req, res) => {
  Blog.findOne({ _id: req.params.id }).then((blog) => {
    res.json(blog);
  });
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

const PORT = process.env.PORT ?? 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
