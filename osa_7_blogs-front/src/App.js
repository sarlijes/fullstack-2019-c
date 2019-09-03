import React, { useState, useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import notificationStore from './notificationStore'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)


  useEffect(() => {
    props.initBlogs()
    if (window.localStorage.getItem('user') !== null) {
      setUser(JSON.parse(window.localStorage.getItem('user')))
    }
    blogService.getAll().then(blogs => console.log(blogs))
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      console.log('--- user logged in! ---', user.name)
      setUser(user)
      blogService.setToken(user.token)
      props.setMessage(`${user.name} logged on`, 4)
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
      // console.log('credentials', credentials)
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
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
    return hookWithoutReset
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    notify(`${user.username} logged out`, true)
    setUser(null)
  }

  const removeBlog = (removedBlog) => {
    const newBlogs = blogs.filter(blog => blog.id !== removedBlog.id)
    setBlogs(newBlogs)
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
          createBlog={createBlog}
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
      <Provider store={notificationStore} >
        <Notification />
      </Provider>,

      <LoginForm className='loginform'
        username={omitReset(username)}
        password={omitReset(password)}

        handleSubmit={handleLogin}
      />
    </div>

  )
  // notificationStore.subscribe() // referenssi
}
// notificationStore.subscribe() // referenssi

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setMessage,
  initBlogs
}

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectApp