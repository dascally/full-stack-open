import axios from 'axios';
const baseURL = 'http://localhost:3001/api/persons';

export const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

export const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};

export const update = (id, newPerson) => {
  return axios.put(`${baseURL}/${id}`, newPerson).then((res) => res.data);
};

export const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};
