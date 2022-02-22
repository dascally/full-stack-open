import { useState } from 'react';

function App() {
  const anecdotesInit = [
    {
      text: 'If it hurts, do it more often',
      votes: 0,
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
      votes: 0,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(anecdotesInit);

  const handleVoteClick = () => {
    const newAnecdotes = anecdotes.slice();
    newAnecdotes[selected].votes++;
    setAnecdotes(newAnecdotes);
  };

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>Has {anecdotes[selected].votes} votes.</p>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next aphorism</button>

      <h1>Anecdote with the most votes</h1>
      {
        anecdotes.reduce((mostVotedAnecdote, anecdote) =>
          anecdote.votes > mostVotedAnecdote.votes
            ? anecdote
            : mostVotedAnecdote
        ).text
      }
    </>
  );
}

export default App;
