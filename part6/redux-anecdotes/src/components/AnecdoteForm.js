import { useDispatch } from 'react-redux';
import * as anecdoteService from '../services/anecdotes';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const content = evt.target.elements.content.value;
    evt.target.elements.content.value = '';

    anecdoteService.addAnecdote(content).then((anecdote) => {
      dispatch(addAnecdote(anecdote));
      dispatch(setNotification('Added a new anecdote.'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='content' required />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
