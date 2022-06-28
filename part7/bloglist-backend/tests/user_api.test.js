const mongoose = require('mongoose');
const app = require('../app.js');
const User = require('../models/user.js');
const api = require('supertest')(app);

const initialUsers = [
  {
    username: 'Ngost',
    name: 'Ngost Regdab',
    passwordHash:
      '$2b$10$KVgCHgkDnSaHGi4YUqMAdOzC8ydX4oXaUH.JmZuXHmPVQVopaR9za',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
});

test('fails when adding a duplicate user', async () => {
  const newUser = {
    username: 'Ngost',
    name: 'Ngost Regdab',
    password: 'giant-badger',
  };

  const res = await api.post('/api/users').send(newUser).expect(400);
  expect(res.body.error).toBe('Username already exists.');
});

test('fails when username is shorter than 3 characters', async () => {
  const newUser = {
    username: 'Ng',
    name: 'Ngost Regdab',
    password: 'giant-badger',
  };

  const res = await api.post('/api/users').send(newUser).expect(400);
  expect(res.body.error).toMatch(/^User validation failed: username/);
});

test('fails when password is shorter than 3 characters', async () => {
  const newUser = {
    username: 'Ebidaj',
    name: 'Ebidaj Paleu',
    password: '12',
  };

  const res = await api.post('/api/users').send(newUser).expect(400);
  expect(res.body.error).toBe('Password must be at least 3 characters long.');
});

test('adds a new valid user', async () => {
  const newUser = {
    username: 'Ebidaj',
    name: 'Ebidaj Paleu',
    password: 'badger',
  };

  const res = await api.post('/api/users').send(newUser).expect(201);
  expect(res.body.username).toBe(newUser.username);
});

afterAll(() => {
  mongoose.connection.close();
});
