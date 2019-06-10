import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

const BlogForm = ({ blogs, setBlogs, notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    let blogObject = {}
    for (const input of event.target.querySelectorAll('input')) {
      blogObject[input.name] = input.value
    }

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notify(`Added a new blog: ${blog.title}`, true)
    } catch (exception) {
      notify(`${exception.response.data.error}`, false)
    }
  }

  return (
    <Togglable buttonLabel='add'>
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
          <br></br>
          <button type='submit'>create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm