import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const content = evt.target.elements.content.value;
    evt.target.elements.content.value = '';
    dispatch(addAnecdote(content));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type='text' name='content' required />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
