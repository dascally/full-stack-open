import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NewNote = (props) => {
  const addNote = (evt) => {
    evt.preventDefault();

    const content = evt.target.elements.note.value;
    evt.target.elements.note.value = '';

    props.createNote(content);
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  );
};

export default connect(null, { createNote })(NewNote);
