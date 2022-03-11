import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

export const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

export const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};
