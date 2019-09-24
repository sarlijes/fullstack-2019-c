import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import '../index.css'

const BlogList = ({ notify, sortBlogs }) => {

  const blogForm = () => (
    <BlogForm
      notify={notify}
    />
  )

  return (
    <div>
      {blogForm()}
      {sortBlogs.map(blog =>
        <div className='blogStyle' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )

}

const sortBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes)

const mapStateToPros = state => {
  return {
    blogs: state.blogs,
    sortBlogs: sortBlogs(state.blogs)
  }
}

const ConnectedBlogList = connect(mapStateToPros)(BlogList)

export default ConnectedBlogList