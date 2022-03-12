import { useEffect, useState } from 'react';
import Filter from './components/Filter.js';
import Listings from './components/Listings.js';
import NewEntryForm from './components/NewEntryForm.js';
import Notification from './components/Notification.js';
import * as personService from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [infoMessage, setInfoMessage] = useState(null);
  const [infoMessageTimer, setInfoMessageTimer] = useState(null);
  const setTempInfoMessage = (message) => {
    setInfoMessage(message);
    clearTimeout(infoMessageTimer);
    setInfoMessageTimer(
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000)
    );
  };

  useEffect(() => {
    personService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

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
            setTempInfoMessage(`${returnedPerson.name}'s number was updated.`);
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setTempInfoMessage(
          `${returnedPerson.name}'s number was added to the phonebook.`
        );
      });
    }
  };

  return (
    <div>
      {infoMessage ? <Notification message={infoMessage} /> : null}

      <h2>Phonebook</h2>
      <Filter
        value={filter}
        onChange={(evt) => {
          setFilter(evt.target.value);
        }}
      />
      <NewEntryForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={(evt) => {
          setNewName(evt.target.value);
        }}
        onNumberChange={(evt) => {
          setNewNumber(evt.target.value);
        }}
      />

      <h2>Numbers</h2>
      <Listings
        entries={persons}
        filter={filter}
        setPersons={setPersons}
        setInfoMessage={setTempInfoMessage}
      />
    </div>
  );
};

export default App;
