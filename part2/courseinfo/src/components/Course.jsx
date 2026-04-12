const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ course }) => (
  <div>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ course }) => (
  <p>
    <b>
      {" "}
      Number of exercises{" "}
      {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
    </b>
  </p>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;