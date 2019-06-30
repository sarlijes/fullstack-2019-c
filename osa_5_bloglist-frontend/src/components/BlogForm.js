import React from 'react'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ blogs, setBlogs, notify }) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const addBlog = async event => {
    event.preventDefault()
    let blogObject = {}
    for (const input of event.target.querySelectorAll('input')) {
      blogObject[input.name] = input.value
    }

    try {
      const blog = await blogService.create(blogObject)
      const newBlog = await blogService.getById(blog.id)
      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} successfully added`)
    } catch (exception) {
      notify(`${exception}`, false)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <Togglable buttonLabel='add'>
      <div>
        <form onSubmit={event => addBlog(event)}>
          <div>
            title:
            <input {...omitReset(title)} />
          </div>
          <div>
            author:
            <input {...omitReset(author)} />
          </div>
          <div>
            url:
            <input {...omitReset(url)} />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default BlogForm