const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordMatches =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      const err = new Error('Incorrect password or username.');
      err.name = 'AuthError';
      throw err;
    }

    const tokenPayload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
