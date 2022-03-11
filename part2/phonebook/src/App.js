import { useEffect, useState } from 'react';
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

const Listings = ({ entries, filter, setPersons }) => {
  return (
    <ul>
      {entries
        .filter((entry) =>
          entry.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((entry) => (
          <li key={entry.id}>
            {entry.name}: {entry.number}{' '}
            <button
              type='button'
              onClick={() => {
                personService.deletePerson(entry.id).then(() => {
                  setPersons(
                    entries.filter((person) => person.id !== entry.id)
                  );
                });
              }}
            >
              Delete
            </button>
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

    const newPerson = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // evt.target.elements[0].setCustomValidity(
      //   `${newName} is already in the phonebook.`
      // );

      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook; replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personService
          .update(existingPerson.id, {
            ...existingPerson,
            ...newPerson,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
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
      <Listings entries={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};

export default App;
