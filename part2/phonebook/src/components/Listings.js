import * as personService from '../services/persons.js';

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

export default Listings;
