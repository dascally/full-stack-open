import { connect /*useDispatch*/ } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ addAnecdote }) => {
  // const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const content = evt.target.elements.content.value;
    evt.target.elements.content.value = '';

    // dispatch(addAnecdote(content));
    addAnecdote(content);
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

export default connect(null, { addAnecdote })(AnecdoteForm);
