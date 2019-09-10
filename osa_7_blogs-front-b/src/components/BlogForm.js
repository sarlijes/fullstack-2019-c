import React from 'react'
import { connect } from 'react-redux'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = props => {

  const author = useField('author')
  const title = useField('title')
  const url = useField('url')

  const handleBlogCreation = async event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      props.createBlog(blogObject)
      title.reset()
      author.reset()
      url.reset()
      props.notify(`a new blog '${blogObject.title}' successfully added`)
    } catch (exception) {
      props.notify(`${exception.response.data.error}`, true)
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
          <button type='submit'>Add</button>
        </form>
      </div>
    </Togglable>
  )
}
BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  notify: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm