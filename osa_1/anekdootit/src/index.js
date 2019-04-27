import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({anecdote, votes}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Statistics = ({daysAnecdote, maxVotes}) => {
  return (
    <div>
    <h1>Anecdote with most votes</h1>
    <p>{daysAnecdote}</p> 
    <p>has {maxVotes} votes</p>
    </div>
  )
}

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6 + 1).join('0').split('').map(parseFloat))

  const giveVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={() => giveVote()} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="next anecdote" />
      <Statistics daysAnecdote={[anecdotes[votes.indexOf(Math.max(...votes))]]} maxVotes={Math.max(...votes)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)