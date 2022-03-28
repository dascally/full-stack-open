const notesRouter = require('express').Router();
const Note = require('../models/note.js');
const User = require('../models/user.js');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
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

notesRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const user = await User.findById(body.userId);

    const note = new Note({
      content: body.content,
      important: body.important ?? false,
      date: new Date(),
      user: user._id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    res.json(savedNote);
  } catch (err) {
    next(err);
  }
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
