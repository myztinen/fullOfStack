const Header = ({name}) => {
  console.log(name)
  return (
      <h2>{name}</h2>
  )
}

const Part = (props) => {
  console.log(props)
  return (
      <p key={props.id}>{props.part} {props.exercises}</p>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </div>
  )
}

const Total = ({parts}) => {
  return (
      <p><strong>Total of {parts.reduce((addedAmount, part) => addedAmount + part.exercises, 0)} exercises</strong></p>
  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  )
}

export default Course

