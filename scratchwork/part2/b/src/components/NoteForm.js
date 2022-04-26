import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (evt) => {
    evt.preventDefault();

    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    });

    setNewNote('');
  };

  const handleNoteChange = (evt) => {
    setNewNote(evt.target.value);
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
