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
