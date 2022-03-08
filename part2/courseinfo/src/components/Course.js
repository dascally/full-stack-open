const Header = ({ courseName }) => <h2>{courseName}</h2>;

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

export default Course;
