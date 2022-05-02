import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteForAnecdote(id));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const content = evt.target.elements.content.value;
    evt.target.elements.content.value = '';
    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='content' required />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
