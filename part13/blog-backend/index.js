require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to DB.');
  })
  .catch((err) => {
    console.log('Error connecting to DB:', err);
  })
  .finally(() => {
    sequelize.close();
  });
