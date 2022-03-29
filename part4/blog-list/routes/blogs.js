const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const middleware = require('../utils/middleware.js');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .populate('user', { username: 1, name: 1 })
    .then((blog) => {
      res.json(blog);
    })
    .catch(next);
});

blogsRouter.post('/', middleware.userExtractor, async (req, res, next) => {
  try {
    const newBlogPost = {
      ...req.body,
      user: req.user._id,
    };

    const blog = new Blog(newBlogPost);
    const savedBlog = await blog.save();

    req.user.blogs.push(savedBlog._id);
    await req.user.save();

    res.status(201).json(savedBlog);
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

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const blogToDelete = await Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res.status(404).end();
    }

    if (req.user._id.toString() !== blogToDelete.user.toString()) {
      const err = new Error("Can not delete another user's blog post.");
      err.name = 'AuthError';
      throw err;
    }

    req.user.blogs = req.user.blogs.filter(
      (blog) => blog.toString() !== blogToDelete._id.toString()
    );
    await Promise.all([req.user.save(), Blog.findByIdAndRemove(req.params.id)]);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
