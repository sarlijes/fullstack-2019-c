import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'LIKE_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

// actions creators

export const initializeBlogs = () => {
  console.log('initilize blogs **************')
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: {
        blogs: blogs
      }
    })
  }
}

export const likeBlog = blog => {
  console.log('**************  reducer likeBlog', blog.user)
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = blog => {
  console.log('**************  reducer removeBlog', blog.user)
  return async dispatch => {
    const removedBlog = await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: removedBlog
    })
  }
}

export default reducer