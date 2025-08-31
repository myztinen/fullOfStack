import { useState } from 'react'

const Header = ({ title }) => <div><br></br><strong>{title}</strong><br></br><br></br></div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const NumberLine = ({text, number}) => <div>{text} {number}</div>

const Statistics = ({good, neutral, bad}) => {
  const noFeedback = 'No feedback given'
  const allValue = good + neutral + bad
  const average = (good-bad) / allValue
  const positive = ((good / allValue) * 100) + ' %' 

  if (allValue > 0) {
    return (
      <div>
        <NumberLine text={'good'} number={good}></NumberLine>
        <NumberLine text={'neutral'} number={neutral}></NumberLine>
        <NumberLine text={'bad'} number={bad}></NumberLine>
        <NumberLine text={'all'} number={allValue}></NumberLine>
        <NumberLine text={'average'} number={average}></NumberLine>
        <NumberLine text={'positive'} number={positive}></NumberLine>
      </div>
    )
  } else {
    return (<div>{noFeedback}</div>)
  }
}

const StatisticsAsTable = ({good, neutral, bad}) => {
  const noFeedback = 'No feedback given'
  const allValue = good + neutral + bad
  const average = (good-bad) / allValue
  const positive = (good / allValue) * 100 

  if (allValue > 0) {
    return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{allValue}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive} %</td>
        </tr>
      </tbody>
    </table>
    )
  } else {
    return (<div>{noFeedback}</div>)
  }
}



const App = () => {
  const headerTitle = 'give feedback'
  const statsTitle = 'statistics'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }


  const handleNeutralClick = () => {
    const updatedneutral = neutral + 1
    setNeutral(updatedneutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <Header title={headerTitle}/>
      <Button onClick={handleGoodClick} text ='good'></Button>
      <Button onClick={handleNeutralClick} text='neutral'></Button>
      <Button onClick={handleBadClick} text='bad'></Button>
      <Header title={statsTitle}/>
      <StatisticsAsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App