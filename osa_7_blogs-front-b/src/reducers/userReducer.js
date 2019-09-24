import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'INIT':
      return action.data
    default:
      return state
  }
}

// actions creators

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
    return user
  }
}


export const logoutUser = () => {
  return async dispatch => {
    await blogService.deleteToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT'
    })
  }

}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT',
      data: users
    })
  }
}

export default userReducer