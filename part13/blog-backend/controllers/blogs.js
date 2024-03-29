const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const where = {};
  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name'],
    },
    attributes: {
      exclude: ['userId'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  try {
    if (!req.blog) return res.status(404).end();
    if (!(req.blog.userId === req.decodedToken.id)) {
      return res.status(401).json({ error: 'Not authorized.' });
    }
    req.blog.destroy();
    return res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
