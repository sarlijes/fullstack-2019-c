import React from 'react'

import { votesToAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes
  const filter = props.store.getState().filter

  const vote = (id, anecdote) => {
    props.store.dispatch(votesToAnecdote(id))
    props.store.dispatch(newMessage(`you voted '${anecdote}'`))
    setTimeout(() => {
      props.store.dispatch(emptyMessage())
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

export default AnecdoteList