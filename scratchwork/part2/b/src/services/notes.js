import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

export const getAll = () => {
  const req = axios.get(baseUrl);
  // return req.then((res) => res.data);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  };
  return req.then((res) => res.data.concat(nonExisting));
};

export const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

export const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};
