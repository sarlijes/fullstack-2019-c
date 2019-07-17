// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const votesToAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      // const newAnecdote = asObject(action.data.anecdote)
      // return [...state, newAnecdote]
      console.log(action.data.anecdote)
      return [...state, action.data.anecdote]
    case 'INITIALIZE':
      return action.data.anecdotes
    default:
      return state
  }

}

export const initializeAnecdote = (anecdotes) => {
  return { 
    type: 'INITIALIZE', 
    data: { anecdotes } 
  }
}

export const createAnecdote = (anecdote) => {
  return { 
    type: 'NEW_ANECDOTE', 
    data: { 
      anecdote: anecdote }
    }
}

export default reducer