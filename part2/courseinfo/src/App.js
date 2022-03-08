const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Total = ({ sum }) => <p>Number of exercises: {sum}</p>;

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {/* Using the array index as key, so don't reorder */}
    {parts.map((part, idx) => (
      <Part key={idx} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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

  return <Course course={course} />;
};

export default App;
