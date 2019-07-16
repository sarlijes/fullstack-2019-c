import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => props.initializeAnecdote(anecdotes))
  }, [])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(
  null,
  { initializeAnecdote }
)(App)