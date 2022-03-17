const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person.js');

morgan.token('data', (req, res) => JSON.stringify(req.body));

const PORT = process.env.PORT ?? 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

app.use(morgan('tiny'));

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${persons.length} ${
          persons.length === 1 ? 'person' : 'people'
        }.</p>` + `<p>${new Date().toString()}</p>`
      );
    })
    .catch(next);
});

app.use('/api', cors());
app.use('/api', express.json());

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch(next);
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch(next);
});

app.post('/api/persons', morgan(':data'));
app.post('/api/persons', (req, res, next) => {
  Person.findOne({ name: req.body.name })
    .then((person) => {
      if (person) {
        throw new Error(`${req.body.name} already exists in phonebook.`);
      }

      const newPerson = new Person({
        name: req.body.name,
        number: req.body.number,
      });

      return newPerson.save();
    })
    .then((newPerson) => {
      res.json(newPerson);
    })
    .catch(next);
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        throw new Error(
          `${req.body.name} was already removed from the server.`
        );
      }

      res.json(updatedPerson);
    })
    .catch(next);
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      if (person) {
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 404;
        res.end();
      }
    })
    .catch(next);
});

app.use(express.static('build'));

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    res.statusCode = 400;
    res.send({ error: 'Malformed ID.' });
  } else {
    res.statusCode = 400;
    res.send({ error: err.message });
  }

  next(err);
});
