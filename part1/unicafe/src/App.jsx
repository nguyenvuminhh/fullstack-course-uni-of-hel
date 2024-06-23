import { useState } from 'react'

const StatisticLine = ({text, data}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{data}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (good+bad+neutral>0) {
    return (
      <table>
        <StatisticLine text='good' data={good} />
        <StatisticLine text='neutral' data={neutral} />
        <StatisticLine text='bad' data={bad} />
        <StatisticLine text='all' data={good+bad+neutral} />
        <StatisticLine text='average' data={(good-bad)/(good+bad+neutral)} />
        <StatisticLine text='positive' data={(good*100/(good+bad+neutral))+' %'} />
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App