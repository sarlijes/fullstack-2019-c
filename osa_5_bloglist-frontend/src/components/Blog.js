import React, { useState } from 'react'
import blogAddition from '../services/blogs'
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

  const like = async () => {
    blog.likes += 1
    try {
      blogAddition.update(blog.id, blog)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className='blogStyle'>
      <div onClick={toggleVisibility}>
        {blog.title}
        <br></br> added by: {blog.author}
        <br></br>
        <a href={blog.url}>{blog.url}</a>
        <br></br> {blog.likes} - likes <button onClick={like}>like</button>
      </div>
    </div>
  )
}

export default Blog