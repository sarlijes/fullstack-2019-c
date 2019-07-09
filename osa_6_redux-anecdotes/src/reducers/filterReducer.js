const reducer = (state = '', action) => {
  // console.log('state:', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE':
      return action.data
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const newFilter = value => {
  return {
    type: 'UPDATE',
    data: value
  }
}

export const resetFilter = () => {
  return {
    type: 'RESET'
  }
}

export default reducer