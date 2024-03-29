const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const where = {};
  if (req.query.read === 'true') {
    where.read = { [Op.is]: true };
  } else if (req.query.read === 'false') {
    where.read = { [Op.is]: false };
  }
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: [''] },
      include: [
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['userId'] },
          through: {
            attributes: ['read', 'id'],
            where,
          },
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: [''] },
      include: [
        {
          model: Blog,
          as: 'reading_list',
          attributes: { exclude: ['userId'] },
          through: { attributes: [] },
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
