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

blogsRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndRemove(req.params.id);

    if (result) {
      res.statusCode = 204;
    } else {
      res.statusCode = 404;
    }

    return res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
