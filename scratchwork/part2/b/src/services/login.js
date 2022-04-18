import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/login';
} else {
  baseUrl = 'http://localhost:3001/api/login';
}

export const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
