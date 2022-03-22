const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.get('/:id', (req, res) => {
  Blog.findOne({ _id: req.params.id }).then((blog) => {
    res.json(blog);
  });
});

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
