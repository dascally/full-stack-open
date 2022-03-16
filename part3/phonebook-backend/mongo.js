const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log('Please enter the password and optionally a name and number:');
  console.log('node mongo.js <password> [<name> <number>]');

  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@fullstack-open.jvwon.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((response) => {
    console.log('Phonebook:');
    response.forEach((person) => {
      console.log(`${person.name}: ${person.number}`);
    });

    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((response) => {
    console.log(
      `Added ${response.name}, with number ${response.number}, to phonebook.`
    );

    mongoose.connection.close();
  });
}
