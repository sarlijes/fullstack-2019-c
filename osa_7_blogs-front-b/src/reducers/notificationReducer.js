const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTICE':
      return action.data
    case 'SET_EMPTY':
      return ''
    default:
      return state
  }
}

export const setMessage = (message, timeout) => {
  return async dispatch => {
    await dispatch({ type: 'SET_NOTICE', data: message })

    timeout = timeout * 1000
    setTimeout(() => {
      dispatch({ type: 'SET_EMPTY' })
    }, timeout)
  }
}

export default reducer