const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const middleware = require('../utils/middleware.js');

blogsRouter.use(middleware.tokenExtractor);

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

blogsRouter.post('/', async (req, res, next) => {
  try {
    if (!req.token) {
      const err = new Error('Missing token.');
      err.name = 'AuthError';
      throw err;
    }

    const tokenPayload = jwt.verify(req.token, process.env.SECRET);
    if (!tokenPayload.id) {
      const err = new Error('Invalid token.');
      err.name = 'AuthError';
      throw err;
    }

    const creator = await User.findById(tokenPayload.id);
    const newBlogPost = {
      ...req.body,
      user: creator._id,
    };

    const blog = new Blog(newBlogPost);
    const savedBlog = await blog.save();

    creator.blogs.push(savedBlog._id);
    await creator.save();

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

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!req.token) {
      const err = new Error('Missing token.');
      err.name = 'AuthError';
      throw err;
    }

    const tokenPayload = jwt.verify(req.token, process.env.SECRET);
    if (!tokenPayload.id) {
      const err = new Error('Invalid token.');
      err.name = 'AuthError';
      throw err;
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).end();
    }

    if (tokenPayload.id !== blog.user?.toString()) {
      const err = new Error("Can not delete another user's blog post.");
      err.name = 'AuthError';
      throw err;
    }

    await Blog.findByIdAndRemove(req.params.id);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
