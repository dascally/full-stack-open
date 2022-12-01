const router = require('express').Router();

const { sequelize } = require('../util/db');
const { Blog } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      group: 'author',
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('*')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      order: [['likes', 'DESC']],
    });

    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
