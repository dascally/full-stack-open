import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/notes';
} else {
  baseUrl = 'http://localhost:3001/api/notes';
}

export const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

export const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

export const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};
