const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};
const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name}: {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises:{' '}
      {parts.reduce(
        (totalExercises, part) => totalExercises + part.exercises,
        0
      )}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half-stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
