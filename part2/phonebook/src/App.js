import { useState } from 'react';

const Numbers = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.name}>
          {entry.name}: {entry.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameInput = (evt) => {
    setNewName(evt.target.value);
  };

  const handleNumberInput = (evt) => {
    setNewNumber(evt.target.value);
  };

  const handleSubmit = (evt) => {
    if (persons.find((person) => person.name === newName)) {
      // evt.target.elements[0].setCustomValidity(
      //   `${newName} is already in the phonebook.`
      // );
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }

    evt.preventDefault();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name:{' '}
            <input type='text' value={newName} onChange={handleNameInput} />
          </label>
        </div>
        <div>
          <label>
            number:{' '}
            <input type='tel' value={newNumber} onChange={handleNumberInput} />
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