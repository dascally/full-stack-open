require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database.');
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err.message}`);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = new mongoose.model('Person', personSchema);
