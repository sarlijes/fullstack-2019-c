import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    props.store.dispatch(createAnecdote(content))

    event.target.anecdote.value = ''
  }

  return (
    <div>
    <h3>create</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm