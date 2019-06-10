import React, { useState } from 'react'
import index from '../index.css'

const Blog = ({ blog }) => {
  const [hidden, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!hidden)
  }

  if (!hidden) {
    return (<div className='blogStyle' onClick={toggleVisibility}>
      {blog.title} {blog.author}
    </div>)
  }

  return (
    <div className='blogStyle'>
      <div onClick={toggleVisibility}>
        {blog.title}
        <br></br> added by: {blog.author}
        <br></br>
        <a href={blog.url}>{blog.url}</a>
        <br></br> {blog.likes}
      </div>
    </div>
  )
}

export default Blog