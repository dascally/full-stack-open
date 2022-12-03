const router = require('express').Router();

const { tokenExtractor } = require('../util/middleware');
const { ReadingList, Blog } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const readingListItem = await ReadingList.create(req.body);
    res.json(readingListItem);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id);
    if (readingList) {
      if (req.decodedToken.id !== readingList.userId) {
        return res.status(401).json({
          error:
            "You don't have authorization to modify other users' reading lists.",
        });
      }
      readingList.read = req.body.read;
      await readingList.save();
      return res.json(readingList);
    } else {
      return res.status(404).json({ error: 'Reading list entry not found.' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
