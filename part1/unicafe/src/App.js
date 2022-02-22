import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;

  return (
    <>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {sum}</p>
      <p>Average: {(good - bad) / sum}</p>
      <p>Positive: {good / sum}</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <button
        onClick={() => {
          setGood(good + 1);
        }}
      >
        Good
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
      >
        Neutral
      </button>
      <button
        onClick={() => {
          setBad(bad + 1);
        }}
      >
        Bad
      </button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
