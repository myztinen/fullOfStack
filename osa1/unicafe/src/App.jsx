import { useState } from 'react'

const Header = ({ title }) => <div><br></br><strong>{title}</strong><br></br><br></br></div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatLine = ({text, number}) => <div>{text} {number}</div>

const Stats = ({good, neutral, bad}) => {

  return (
    <div>
      <StatLine text={'good'} number={good}></StatLine>
      <StatLine text={'neutral'} number={neutral}></StatLine>
      <StatLine text={'bad'} number={bad}></StatLine>
    </div>
  )
}


const App = () => {
  const headerTitle = 'give feedback'
  const statsTitle = 'statistics'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }


  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title={headerTitle}/>
      <Button onClick={handleGoodClick} text ='good'></Button>
      <Button onClick={handleNeutralClick} text='neutral'></Button>
      <Button onClick={handleBadClick} text='bad'></Button>
      <Header title={statsTitle}/>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App