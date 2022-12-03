const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { ActiveSession, User } = require('../models');

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

  const activeSession = await ActiveSession.findByPk(
    req.decodedToken.sessionId,
    {
      include: { model: User },
    }
  );
  if (!activeSession) {
    return res.status(401).json({ error: 'Invalid session ID.' });
  }
  if (activeSession.user?.disabled !== false) {
    return res.status(401).json({ error: 'User account disabled.' });
  }

  next();
};

module.exports = { tokenExtractor };
