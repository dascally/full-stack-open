const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models');
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

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
