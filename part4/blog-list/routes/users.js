const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user.js');

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error('Username already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
