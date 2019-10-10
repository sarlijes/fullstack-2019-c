import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, removeBlog } from './reducers/blogReducer'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/userReducer'
import Blog from './components/Blog'
import './index.css'

const App = ({
  user,
  users,
  initializeBlogs,
  setMessage,
  loginUser,
  setUser,
  logoutUser,
  blogs
}) => {
  const username = useField('username')
  const password = useField('password')

  useEffect(() => {
    initializeBlogs()
  }, [])

  useEffect(() => {
    initializeUsers()
  }, [])

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

  const userId = id => users.find(user => user.id === id)
  const blogId = id => blogs.find(blog => blog.id === id)

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
      <Router>
        <div className='menuStyle'>
          <Link to="/">blogs</Link>{' '}
          <Link to="/users">users</Link>
          {' '}{user.username} logged in {' '}
          <button onClick={handleLogout}>logout</button>
        </div>
        <h2>Blog app</h2>
        <Notification />
        <button onClick={handleLogout}>logout</button>
        <Route exact path="/" render={() =>
          <BlogList
            notify={notify}
          />}
        />
        <Route exact path="/users" render={({ match }) => <Users path={match.path} />} />
        <Route path="/users/:id" render={({ match }) => <User user={userId(match.params.id)} />} />
        <Route exact path="/blogs/:id" render={({ match }) => <Blog notify={notify} blog={blogId(match.params.id)} />} />
        <Redirect to="/" />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  removeBlog,
  setMessage,
  loginUser,
  setUser,
  logoutUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp