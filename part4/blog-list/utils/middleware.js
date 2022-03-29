const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');
  const tokenMatch = authorization?.match(/^Bearer (?<token>\S+)$/i);

  req.token = tokenMatch ? tokenMatch.groups.token : null;

  next();
};

module.exports = { tokenExtractor };
