const router = require('express').Router();

const { Note } = require('../models');

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    await note.destroy();
  }

  res.status(204).end();
});

router.put('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
