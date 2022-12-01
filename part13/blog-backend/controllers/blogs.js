const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      req.blog.destroy();
    }
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
