import React from 'react'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ props, notify }) => {
  const author = useField('author')
  const title = useField('title')
  const url = useField('url')

  const handleBlogCreation = async event => {
    event.preventDefault()
    const blogObject = {}
    for (const input of event.target.querySelectorAll('input')) {
      blogObject[input.name] = input.value
      console.log('input', input.value)
    }

    try {
      props.createBlog(blogObject)
      // notify('a new blog successfully added', false)
      notify(`a new blog ${blogObject.title} successfully added`)
      title.reset()
      author.reset()
      url.reset()
    } catch (error) {
      // notify(`${exception.response.data.error}`, true)
      // console.log('error', exception)
      console.log('error')
    }

  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }


  return (
    <Togglable buttonLabel='add'>
      <div>
        <form onSubmit={event => handleBlogCreation(event)}>
          <div>
            author:
            <input {...omitReset(author)} />
          </div>
          <div>
            title:
            <input {...omitReset(title)} />
          </div>
          <div>
            url:
            <input {...omitReset(url)} />
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


const mapDispatchToProps = {
  createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm