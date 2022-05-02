import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => (
  <div>
    <Notification />
    <h2>Anecdotes</h2>
    <AnecdoteForm />
    <AnecdoteList />
  </div>
);

export default App;
