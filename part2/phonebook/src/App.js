import { useEffect, useState } from 'react';
import axios from 'axios';
import * as personService from './services/persons.js';

const Filter = ({ value, onChange }) => {
  return (
    <p>
      Filter shown with{' '}
      <input type='search' value={value} onChange={onChange} />
    </p>
  );
};

const NewEntryForm = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          name: <input type='text' value={newName} onChange={onNameChange} />
        </label>
      </div>
      <div>
        <label>
          number:{' '}
          <input type='tel' value={newNumber} onChange={onNumberChange} />
        </label>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const Listings = ({ entries, filter }) => {
  return (
    <ul>
      {entries
        .filter((entry) =>
          entry.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((entry) => (
          <li key={entry.name}>
            {entry.name}: {entry.number}
          </li>
        ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  const handleNameInput = (evt) => {
    setNewName(evt.target.value);
  };
  const handleNumberInput = (evt) => {
    setNewNumber(evt.target.value);
  };
  const handleFilterInput = (evt) => {
    setFilter(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      // evt.target.elements[0].setCustomValidity(
      //   `${newName} is already in the phonebook.`
      // );
      alert(`${newName} is already in the phonebook.`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterInput} />
      <NewEntryForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameInput}
        onNumberChange={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Listings entries={persons} filter={filter} />
    </div>
  );
};

export default App;
