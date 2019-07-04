import React from 'react';
import { votesToAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch(
      votesToAnecdote(id)
    )
  }

  const create = event => {
    event.preventDefault()
    props.store.dispatch({ type: 'NEW_ANECDOTE', data: { content: event.target.anecdote.value }})
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button action='submit'>create</button>
      </form>
    </div>
  )
}

export default App