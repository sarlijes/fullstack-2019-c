const reducer = (state = 'some message', action) => {
  console.log('stste:', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTICE':
      return action.content
    default:
      return state
  }
}

export const setNotification = content => {
  return {
    type: 'SET_NOTICE',
    data: {
      content: content
    }
  }
}

export default reducer