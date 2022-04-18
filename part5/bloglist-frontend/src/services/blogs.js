import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
