const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const res = await fetch(baseUrl);
  return res.json();
}
