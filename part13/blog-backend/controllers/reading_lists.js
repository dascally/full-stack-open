const router = require('express').Router();

const { ReadingList } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const readingListItem = await ReadingList.create(req.body);
    res.json(readingListItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
