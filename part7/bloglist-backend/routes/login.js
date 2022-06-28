const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = require('../utils/config.js').SECRET;
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

    const token = jwt.sign(tokenPayload, SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
