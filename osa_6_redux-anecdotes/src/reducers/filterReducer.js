const filterReducer = (state = '', action) => {

  switch (action.type) {
    case 'SET_FILTER':
      return action.data.filter
    case 'SET_EMPTY':
      return ''
    default:
      return state
  }
}

export const newFilter = ( filter ) => {
  return { type: 'SET_FILTER', data: { filter }}
}

export const emptyFilter = () => {
  return { type: 'SET_EMPTY' }
}

export const updateFilter = value => {
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

export default filterReducer