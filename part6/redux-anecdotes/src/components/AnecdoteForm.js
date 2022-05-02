import { useDispatch } from 'react-redux';
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
    dispatch(addAnecdote(content));
    dispatch(setNotification('Added a new anecdote.'));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
