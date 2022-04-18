import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/notes';
} else {
  baseUrl = 'http://localhost:3001/api/notes';
}

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};
