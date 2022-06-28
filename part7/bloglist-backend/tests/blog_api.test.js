const supertest = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');
const SECRET = require('../utils/config.js').SECRET;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

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

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: 'Ebidaj',
    name: 'Ebidaj Paleu',
    passwordHash: await bcrypt.hash('badger', 10),
  });
  await user.save();
  const newUser = await User.findOne({ username: 'Ebidaj' });

  const blogs = initialBlogs
    .map((blog) => new Blog({ ...blog, user: newUser._id }))
    .map((blog) => blog.save());

  await Promise.all(blogs);

  token = jwt.sign({ username: newUser.username, id: newUser._id }, SECRET);
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

test('creates a new post after receiving POST request', async () => {
  const newBlogPost = {
    title: 'A new post',
    author: 'Ebidaj the Tester',
    url: 'http://www.test.test/test',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost);

  const blogs = await Blog.find({});
  expect(blogs.length).toBe(initialBlogs.length + 1);
});

test('new posts default to 0 likes if not specified', async () => {
  const newBlogPost = {
    title: 'A new post with likes unspecified',
    author: 'Another Author',
    url: 'http://www.example.org/',
  };

  const res = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost);

  const blog = await api.get(`/api/blogs/${res.body.id}`);

  expect(blog.body.likes).toBe(0);
});

test('new posts missing title and url are rejected with 400 status code', async () => {
  const newBlogPost = {
    author: 'Author',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(400);
});

test('deletes specified blog post', async () => {
  const blogs = await Blog.find({});
  const blogToDelete = blogs[0].toJSON();

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
});

test('updates specified blog post', async () => {
  const blogs = await Blog.find({});

  const blogToUpdate = blogs[0].toJSON();
  blogToUpdate.title = 'New title';
  blogToUpdate.likes = 777;

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(blogToUpdate)
    .expect(200);

  const updatedBlog = await Blog.findById(blogToUpdate.id);

  expect(updatedBlog.title).toBe('New title');
  expect(updatedBlog.likes).toBe(777);
});

test('creating blog post fails with status code 401 if no token is provided', async () => {
  const newBlogPost = {
    title: "A new post that won't post",
    author: 'Ebidaj the Tester',
    url: 'http://www.test.test/test',
    likes: 1,
  };

  await api.post('/api/blogs').send(newBlogPost).expect(401);

  const blogs = await Blog.find({});
  expect(blogs.length).toBe(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
