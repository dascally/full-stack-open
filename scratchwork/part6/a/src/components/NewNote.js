import { createNote } from '../reducers/noteReducer';
import { useDispatch } from 'react-redux';
import * as noteService from '../services/notes';

const NewNote = (props) => {
  const dispatch = useDispatch();

  const addNote = async (evt) => {
    evt.preventDefault();

    const content = evt.target.elements.note.value;
    evt.target.elements.note.value = '';

    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  );
};

export default NewNote;
