import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    props.store.dispatch(createAnecdote(content))
    props.store.dispatch(newMessage(`You added '${event.target.anecdote.value}'`))
    setTimeout(() => {
      props.store.dispatch(emptyMessage())
    }, 5000)

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