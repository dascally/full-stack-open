import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;

  return good === 0 && neutral === 0 && bad === 0 ? (
    <p>No feedback given.</p>
  ) : (
    <>
      <StatisticLine label='Good' value={good} />
      <StatisticLine label='Neutral' value={neutral} />
      <StatisticLine label='Bad' value={bad} />
      <StatisticLine label='All' value={sum} />
      <StatisticLine label='Average' value={(good - bad) / sum} />
      <StatisticLine label='Positive' value={good / sum} />
    </>
  );
};

const StatisticLine = ({ label, value }) => (
  <p>
    {label}: {value}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        onClick={() => {
          setGood(good + 1);
        }}
        text='Good'
      />
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        text='Neutral'
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        text='Bad'
      />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
