import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as anecdoteService from './services/anecdotes';
import { addAllAnecdotes } from './reducers/anecdoteReducer';
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(addAllAnecdotes(anecdotes));
    });
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
