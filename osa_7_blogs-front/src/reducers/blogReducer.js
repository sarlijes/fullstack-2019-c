import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('action data blogReducer --->', action.type, action.data)
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data.blogs]
    case 'INITIALIZE':
      return action.data.blogs
    default:
      return state
  }
}

// actions

export const initBlogs = () => {
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

export const createBlog = (blog) => {
  console.log('createBlog', blog)
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: {
        blog: newBlog
      }
    })
  }
}

export default reducer