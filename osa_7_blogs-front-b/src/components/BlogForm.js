import React from 'react'
import { connect } from 'react-redux'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { Form } from 'semantic-ui-react'

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
        <Form onSubmit={event => handleBlogCreation(event)}>
          <Form.Field>
            <label>title</label>
            <input id="title" data-cy="title" {...omitReset(title)} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input id="author" data-cy="author" {...omitReset(author)} />
          </Form.Field>
          <Form.Field>
            <label>url</label>
            <input id="url" data-cy="url" {...omitReset(url)} />
          </Form.Field>
          <button type='submit' data-cy="Add">Add</button>
        </Form>
      </div>
    </Togglable>
  )
}
BlogForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm