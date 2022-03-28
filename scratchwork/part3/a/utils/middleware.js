const logger = require('./logger.js');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID.' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token.' });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired.' });
  }

  logger.error(err.message);

  next(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
