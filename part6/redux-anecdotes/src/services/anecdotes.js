const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};

export const addAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  });
  return res.json();
};

export const voteForAnecdote = async (anecdote) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(votedAnecdote),
  });
  return res.json();
};
