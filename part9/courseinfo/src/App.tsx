interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: 'special';
  requirements: Array<string>;
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

function App() {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the easy course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the hard course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
}

function Header({ name }: { name: string }) {
  return <h1>{name}</h1>;
}

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <>
      {courseParts.map((coursePart, idx) => (
        <Part coursePart={coursePart} key={idx} />
      ))}
    </>
  );
}

function Part({ coursePart }: { coursePart: CoursePart }) {
  const courseAttributes = [
    <p key='name' style={{ margin: 0 }}>
      Name: {coursePart.name}
    </p>,
    <p key='type' style={{ margin: 0 }}>
      Type: {coursePart.type}
    </p>,
    <p key='exerciseCount' style={{ margin: 0 }}>
      Exercise count: {coursePart.exerciseCount}
    </p>,
  ];

  switch (coursePart.type) {
    case 'normal':
      courseAttributes.push(
        <p key='description' style={{ margin: 0 }}>
          Description: {coursePart.description}
        </p>
      );
      break;
    case 'groupProject':
      courseAttributes.push(
        <p key='groupProjectCount' style={{ margin: 0 }}>
          Group project count: {coursePart.groupProjectCount}
        </p>
      );
      break;
    case 'submission':
      courseAttributes.push(
        <p key='description' style={{ margin: 0 }}>
          Description: {coursePart.description}
        </p>,
        <p key='exerciseSubmissionLink' style={{ margin: 0 }}>
          Exercise submission link: {coursePart.exerciseSubmissionLink}
        </p>
      );
      break;
    case 'special':
      courseAttributes.push(
        <p key='description' style={{ margin: 0 }}>
          Description: {coursePart.description}
        </p>,
        <p key='requirements' style={{ margin: 0 }}>
          Requirements: {coursePart.requirements.join(', ')}
        </p>
      );
      break;
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assertNever: never = coursePart;
    }
  }

  return <div style={{ marginBottom: '1rem' }}>{courseAttributes}</div>;
}

function Total({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default App;
