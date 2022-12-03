const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const tokenExtractor = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if (
    authorizationHeader &&
    authorizationHeader.toLowerCase().startsWith('bearer ')
  ) {
    try {
      req.decodedToken = jwt.verify(authorizationHeader.slice(7), SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Token invalid.' });
    }
  } else {
    return res.status(401).json({ error: 'Token missing.' });
  }

  next();
};

module.exports = { tokenExtractor };
