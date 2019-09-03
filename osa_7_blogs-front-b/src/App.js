import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, removeBlog } from './reducers/blogReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      notify(`${username.value} logged in`, false)
      username.reset('')
      password.reset('')
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
      notify(`${exception.response.data.error}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    notify(`${user.username} logged out`, false)
    setUser(null)
  }

  if (user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{`Logged in as ${user.name}`}</p>
        <br></br>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          notify={notify}
        />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
          ))}
        <br></br>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

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

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps,
  {
    initializeBlogs,
    removeBlog,
    setMessage
  })(App)
