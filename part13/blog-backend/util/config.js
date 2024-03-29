require('dotenv').config();

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT ?? 3001,
  SECRET: process.env.SECRET ?? 'default-insecure-secret',
};
