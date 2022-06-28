const jwt = require('jsonwebtoken');
const SECRET = require('../utils/config.js').SECRET;
const User = require('../models/user.js');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');
  const tokenMatch = authorization?.match(/^Bearer (?<token>\S+)$/i);

  req.token = tokenMatch ? tokenMatch.groups.token : null;

  next();
};

const userExtractor = async (req, res, next) => {
  try {
    if (!req.token) {
      const err = new Error('Missing token.');
      err.name = 'AuthError';
      throw err;
    }

    const tokenPayload = jwt.verify(req.token, SECRET);
    if (!tokenPayload.id) {
      const err = new Error('Invalid token.');
      err.name = 'AuthError';
      throw err;
    }

    req.user = await User.findById(tokenPayload.id);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { tokenExtractor, userExtractor };
