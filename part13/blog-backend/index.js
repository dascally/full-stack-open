require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

sequelize
  .query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
  .then((blogs) => {
    for ({ author, title, likes } of blogs) {
      console.log(
        `${author}: '${title}', ${likes} like${likes === 1 ? '' : 's'}`
      );
    }
  })
  .catch((err) => {
    console.log('Error connecting to DB:', err);
  });
