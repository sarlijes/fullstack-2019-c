import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, removeBlog } from './reducers/blogReducer'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'

const App = ({
  user,
  initializeBlogs,
  setMessage,
  loginUser,
  setUser,
  logoutUser,
}) => {
  const username = useField('username')
  const password = useField('password')

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    setMessage({ message, error }, 4)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await loginUser(credentials)
      username.reset()
      password.reset()

      notify(`${user.username} successfully logged in`)
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const blogFormRef = React.createRef()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    notify(`${user.username} successfully logged out`, false)
    setUser(null)
    logoutUser()
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm className='loginform'
          username={omitReset(username)}
          password={omitReset(password)}

          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.username} logged in</p>
      <Router>
        <Route exact path="/" render={() =>
          <BlogList
            notify={notify}
            blogFormRef={blogFormRef}
          />}
        />
        <Route path="/users" render={() => <Users />} />
      </Router>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  removeBlog,
  setMessage,
  loginUser,
  setUser,
  logoutUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp