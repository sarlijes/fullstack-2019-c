import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = () => {
  return (
    <div>
      <h1>anna palautetta</h1>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <div>
          <Statistic text='hyva' value={props.good} />
          <Statistic text='neutraali' value={props.neutral} />
          <Statistic text='huono' value={props.bad} />
          <div>
            <table>
              <tbody>
                <tr>
                  <td>yhteensä</td>
                  <td>{props.total}</td>
                </tr>
                <tr>
                  <td>keskiarvo</td>
                  <td>{props.keskiarvo}</td>
                </tr>
                <tr>
                  <td>positiivisia</td>
                  <td>{props.positiivisia}%</td>
                </tr>              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistiikka</h1>
      <p>Ei yhtään palautetta annettu</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  let keskiarvo = (good - bad) / total
  let positiivisia = (good / total) * 100

  return (
    <div>
      <Display />
      <Button handleClick={() => setGood(good + 1)} text='hyva' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutraali' />
      <Button handleClick={() => setBad(bad + 1)} text='huono' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} 
      keskiarvo={keskiarvo} positiivisia={positiivisia} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
