import { useState, useEffect } from 'react';
import * as noteService from './services/notes.js';
import * as loginService from './services/login.js';
import Note from './components/Note.js';
import Notification from './components/Notification.js';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '16px',
  };

  return (
    <div style={footerStyle}>
      <br />
      <i>
        Note app; Department of Computer Science, University of Helsinki; 2022
      </i>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((err) => {
        setErrorMessage(
          `The note '${note.content}' was already removed from the server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (evt) => {
    evt.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (evt) => {
    setNewNote(evt.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (evt) => {
    evt.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('currentUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage('Invalid credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type='submit'>Save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is logged in.</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
