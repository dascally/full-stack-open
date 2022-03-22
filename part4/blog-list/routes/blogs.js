const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch(next);
});

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      res.json(blog);
    })
    .catch(next);
});

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

module.exports = blogsRouter;
