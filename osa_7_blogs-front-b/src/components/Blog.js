import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../index.css'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, notify, likeBlog, removeBlog }) => {
  const [hidden, setVisible] = useState(false)

  const blogOwner = blog.author === user.username
  const buttonShow = { display: blogOwner ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!hidden)
  }

  if (!hidden) {
    return (<div className='blogStyle' onClick={toggleVisibility}>
      {blog.title} {blog.author}
    </div>)
  }

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title}? by ${blog.author}`)) {
      removeBlog(blog)
      notify(`blog '${blog.title}' removed succesfully`, false)
      console.log('removed succesfully blog:', blog.title)
    }
  }

  return (
    <div className='blogStyle'>
      <div className='toggle' onClick={toggleVisibility}>
        {blog.title}
        <br />
        <a href={blog.url}>{blog.url}</a>
        {blog.likes} - likes
        <button onClick={() => likeBlog(blog)}>like</button> <br />
        <br /> added by: {blog.author}
        <br /> <button style={buttonShow} onClick={remove}>remove</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog: likeBlog,
  removeBlog: removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog