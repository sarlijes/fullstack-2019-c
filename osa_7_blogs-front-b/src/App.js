import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, removeBlog } from './reducers/blogReducer'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('username')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    props.setMessage({ message, error }, 4)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await props.loginUser(credentials)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    notify(`${props.user.username} successfully logged out`, false)
    props.setUser(null)
    props.logoutUser()
  }

  if (props.user === null) {
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
      <p>{props.user.username} logged in</p>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        notify={notify}
      />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={props.user} removeBlog={removeBlog} />
        ))}
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