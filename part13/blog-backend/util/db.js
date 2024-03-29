const Sequelize = require('sequelize');
const { DB_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DB_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to the database.');
  } catch (err) {
    console.log('Failed to connect to the database.', err);
    return process.exit(1);
  }

  return null;
};

const migrationConf = {
  migrations: { glob: 'migrations/*.js' },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations are up to date.', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollBackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollBackMigration };
