const notesRouter = require('express').Router();
const Note = require('../models/note.js');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

notesRouter.post('/', async (req, res) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important ?? false,
    date: new Date(),
  });

  const savedNote = await note.save();
  res.status(201).json(savedNote);
});

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch(next);
});

notesRouter.delete('/:id', async (req, res) => {
  const result = await Note.findByIdAndRemove(req.params.id);
  if (result) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = notesRouter;
