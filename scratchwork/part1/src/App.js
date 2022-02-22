import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>{counter}</div>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setCounter(0);
        }}
      >
        Zero
      </button>
    </div>
  );
};

export default App;
