const supertest = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Blog = require('../models/blog.js');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Title of a new post',
    author: 'Ebidaj',
    url: 'http://localhost/post-url',
    likes: 1580000000000,
  },
  {
    title: 'Another post',
    author: 'Marie',
    url: 'http://www.example.net/',
    likes: 30,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = initialBlogs
    .map((blog) => new Blog(blog))
    .map((blog) => blog.save());

  await Promise.all(blogs);
});

test('returns blog posts as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /^application\/json/);
});

test('returns the correct number of blog posts', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('returns blog post with "id" property', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
