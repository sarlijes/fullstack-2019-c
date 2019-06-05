import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

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

  const alert = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => { setNotification({}) }, 4000);
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      alert(`${username} logged in`)
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
      alert(`${exception.response.data.error}`)
    }
  }

  const loginForm = () => {
    return (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
    )
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    alert(`${user.username} logged out`)
    setUser(null)
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <Notification notification={notification} />
          <button onClick={() => handleLogout()}>logout</button>
          <br></br>
          <br></br>
          <BlogForm blogs={blogs} setBlogs={setBlogs}
            alert={alert}
          />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      }
    </div>
  )
}

export default App