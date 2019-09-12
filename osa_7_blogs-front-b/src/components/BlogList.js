import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({ notify, sortedBlogs }) => {

  const blogForm = () => (
    <BlogForm
      notify={notify}
    />
  )

  return (
    <div>
      {blogForm()}
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          notify={notify}
        />
      )}
    </div>
  )

}

const sortedBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes)

const mapStateToPros = state => {
  return {
    blogs: state.blogs,
    sortedBlogs: sortedBlogs(state.blogs)
  }
}

const ConnectedBlogList = connect(mapStateToPros)(BlogList)

export default ConnectedBlogList