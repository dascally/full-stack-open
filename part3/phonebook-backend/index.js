const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person.js');

morgan.token('data', (req, res) => JSON.stringify(req.body));

const PORT = process.env.PORT ?? 3001;

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

app.use(morgan('tiny'));

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} ${
      persons.length === 1 ? 'person' : 'people'
    }.</p>` + `<p>${new Date().toString()}</p>`
  );
});

app.use('/api', cors());
app.use('/api', express.json());

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.post('/api/persons', morgan(':data'));
app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) {
    res.statusCode = 400;
    res.json({ error: 'Name or number is missing.' });
    return;
  }

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson.save().then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id).then((person) => {
    if (person) {
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.use(express.static('build'));
