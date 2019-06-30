import React from 'react'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ setBlogs, notify, blogs }) => {
  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  const addBlog = async event => {
    event.preventDefault()
    console.log('author -> ', author)
    console.log('title -> ', title)
    console.log('url ->', url)

    try {
      console.log('luodaan blogi')
      const response = await blogService.create({
        newObject: {
          title: title.value,
          author: author.value,
          url: url.value
        }
      })
      console.log('haetaan blogit')
      const allBlogs = await blogService.getAll()
      console.log('Haettu kaikki blogit')
      setBlogs(allBlogs)
      title.reset()
      author.reset()
      url.reset()
      notify(`a new blog ${response.title} successfully added`)
    } catch (exception) {
      notify(`${exception}`, false)
    }
  }

  return (
    <Togglable buttonLabel='add'>
      <div>
        <form onSubmit={event => addBlog(event)}>
          <div>
            author:
            <input {...author} />
          </div>
          <div>
            title:
            <input {...title} />
          </div>
          <div>
            url:
            <input {...url} />
          </div>
          <button type="submit">Add</button>
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