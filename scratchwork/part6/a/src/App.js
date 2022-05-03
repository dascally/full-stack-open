import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as noteService from './services/notes';
import { setNotes } from './reducers/noteReducer';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => {
      dispatch(setNotes(notes));
    });
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
