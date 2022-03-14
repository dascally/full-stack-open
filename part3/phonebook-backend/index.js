const express = require('express');

const PORT = 3001;

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} ${
      persons.length === 1 ? 'person' : 'people'
    }.</p>` + `<p>${new Date().toString()}</p>`
  );
});

app.use('/api', express.json());

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((person) => person.id === +req.params.id);

  if (person) {
    res.json(person);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

app.post('/api/persons', (req, res) => {
  const generateId = () => {
    return Math.trunc(Math.random() * 1000000);
  };

  const newPerson = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number,
  };

  persons.push(newPerson);

  res.json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const newPersons = persons.filter((person) => person.id !== +req.params.id);

  if (newPersons.length === persons.length) {
    res.statusCode = 404;
    res.end();
  } else {
    persons = newPersons;
    res.statusCode = 204;
    res.end();
  }
});
