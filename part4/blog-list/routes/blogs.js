const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
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
