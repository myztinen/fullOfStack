
const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
      <p>{props.part} {props.exercises}</p>
  )
}

const Content2 = (props) => {
  console.log(props)
  return (
      <div>
      <Part part={props.contents[0].part} exercises={props.contents[0].exercises}/>
      <Part part={props.contents[1].part} exercises={props.contents[1].exercises}/>
      <Part part={props.contents[2].part} exercises={props.contents[2].exercises}/>
      </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
      <>
      <p>{props.contents[0].part} {props.contents[0].exercises}</p>
      <p>{props.contents[1].part} {props.contents[1].exercises}</p>
      <p>{props.contents[2].part} {props.contents[2].exercises}</p>
      </>
  )
}


const Total = (props) => {
  console.log(props)
  return (
      <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const contents = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 },
  ]

return (
    <div>
      <Header course={course} />
      <Content2 contents={contents} />
      <Total total={contents[0].exercises + contents[1].exercises + contents[2].exercises} />
    </div>
  )
}

export default App