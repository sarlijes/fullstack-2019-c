import React from 'react'
import { connect } from 'react-redux'
import { votesToAnecdote } from '../reducers/anecdoteReducer'
import { newMessage } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const vote = (id, anecdote) => {
    props.votesToAnecdote(id)
    props.newMessage(`you voted '${anecdote}'`)
    setTimeout(() => {
      props.newMessage('')
    }, 3000)
  }

  const mostVotes = (a, b) => b.votes - a.votes

  const anecdotesToList = anecdote => (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  )

  return (
    <div>
      {anecdotes
        .sort(mostVotes)
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote => anecdotesToList(anecdote)
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  votesToAnecdote,
  newMessage
}

const ConnectAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectAnecdoteList