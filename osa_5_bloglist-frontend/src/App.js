import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifiation'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('login succeeded')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('*** virheellinen ***')
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async event => {
    event.preventDefault()
    let blogObject = {}
    for (const input of event.target.querySelectorAll('input')) {
      blogObject[input.name] = input.value
    }

    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Please log in to App</h2>
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
          <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
          <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>kirjaudu</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <p>Logged in as {user.name}</p>
      <Notification message={errorMessage} />
      <h2>Blogs</h2>
      <form onSubmit={handleLogout}>
        <button type='submit'>logout</button>
      </form>
      <h2>Add a New Blog</h2>
      <div>
        <form onSubmit={event => addBlog(event)}>
          <div>
            title:
          <input
              type='text'
              name='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
          <input
              type='text'
              name='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
          <input
              type='text'
              name='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
      <br></br>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App