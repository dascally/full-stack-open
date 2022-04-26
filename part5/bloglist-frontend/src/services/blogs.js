import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  token = newToken;
};

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const like = async (blog) => {
  const likedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
  const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const remove = async (blogId) => {
  await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
