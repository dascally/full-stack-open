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

test('creates a new post after receiving POST request', async () => {
  const newBlogPost = {
    title: 'A new post',
    author: 'Tester',
    url: 'http://www.test.test/test',
    likes: 1,
  };

  await api.post('/api/blogs').send(newBlogPost);

  const blogs = await Blog.find({});
  expect(blogs.length).toBe(initialBlogs.length + 1);
});

test('new posts default to 0 likes if not specified', async () => {
  const newBlogPost = {
    title: 'A new post with likes unspecified',
    author: 'Another Author',
    url: 'http://www.example.org/',
  };

  const res = await api.post('/api/blogs').send(newBlogPost);

  const blog = await api.get(`/api/blogs/${res.body.id}`);

  expect(blog.body.likes).toBe(0);
});

test('new posts missing title and url are rejected with 400 status code', async () => {
  const newBlogPost = {
    author: 'Author',
    likes: 1,
  };

  await api.post('/api/blogs').send(newBlogPost).expect(400);
});

test('deletes specified blog post', async () => {
  const blogs = await Blog.find({});
  const blogToDelete = blogs[0].toJSON();

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
});

test('updates specified blog post', async () => {
  const blogs = await Blog.find({});

  const blogToUpdate = blogs[0].toJSON();
  blogToUpdate.title = 'New title';
  blogToUpdate.likes = 777;

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

  const updatedBlog = await Blog.findById(blogToUpdate.id);

  expect(updatedBlog.title).toBe('New title');
  expect(updatedBlog.likes).toBe(777);
});

afterAll(() => {
  mongoose.connection.close();
});
