import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)
    props.newMessage(`you added '${newAnecdote.content}'`)
    setTimeout(() => {
      props.newMessage('')
    }, 3000)
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

const mapDispatchToProps = {
  createAnecdote, newMessage
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)