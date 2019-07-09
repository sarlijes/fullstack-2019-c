const reducer = (state = '', action) => {
  // console.log('state:', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTICE':
      return action.data.message
    case 'SET_EMPTY':
      return ''
    default:
      return state
  }
}

export const newMessage = ( message ) => {
  return { type: 'SET_NOTICE', data: { message }}
}

export const emptyMessage = ( message ) => {
  return { type: 'SET_EMPTY' }
}

export default reducer