const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <h4>total of {sum} exercises</h4>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(
    <>
      {parts.map(a => <Part part={a} key={a.id} />)}
    </>
  )
}

const Course = ({course}) =>{
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum = {course.parts.map(a => a.exercises).reduce((a, b) => a+b)} />
    </div>
  )
}

export default Course