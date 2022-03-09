import { useState } from 'react';

const Numbers = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.name}>{entry.name}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameInput = (evt) => {
    setNewName(evt.target.value);
  };

  const handleSubmit = (evt) => {
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName('');
    }

    evt.preventDefault();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name: <input value={newName} onChange={handleNameInput} />
          </label>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers entries={persons} />
    </div>
  );
};

export default App;
