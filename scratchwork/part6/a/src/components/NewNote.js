import { createNote } from '../reducers/noteReducer';
import { useDispatch } from 'react-redux';

const NewNote = (props) => {
  const dispatch = useDispatch();

  const addNote = async (evt) => {
    evt.preventDefault();

    const content = evt.target.elements.note.value;
    evt.target.elements.note.value = '';

    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  );
};

export default NewNote;
