import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => (
  <div>
    <Notification />
    <h2>Anecdotes</h2>
    <Filter />
    <AnecdoteForm />
    <AnecdoteList />
  </div>
);

export default App;
