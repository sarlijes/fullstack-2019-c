import React from 'react'

import { votesToAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const vote = (id, anecdote) => {
    props.store.dispatch(votesToAnecdote(id))
    props.store.dispatch(newMessage(`you voted '${anecdote}'`))
    setTimeout(() => {
      props.store.dispatch(emptyMessage())
    }, 3000)
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList