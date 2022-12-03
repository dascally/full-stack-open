const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { User, ActiveSession } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { SECRET } = require('../util/config');

router.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const isPasswordCorrect = body.password === 'secret';

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password.',
    });
  }

  const activeSession = await ActiveSession.create({ userId: user.id });
  const userForToken = {
    username: user.username,
    id: user.id,
    sessionId: activeSession.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

router.delete('/', tokenExtractor, async (req, res, next) => {
  const activeSession = await ActiveSession.findByPk(
    req.decodedToken.sessionId
  );

  if (activeSession) {
    await activeSession.destroy();
  }

  res.status(200).send({
    message: 'Successfully logged out.',
  });
});

module.exports = router;
