import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      console.log('init:', action.data.blogs)
      return action.data.blogs
    case 'CREATE_BLOG':
      console.log('add:', action.data)
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data)
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

export const createBlog = blog => {
  console.log('createBlog **************', blog)
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog
    })
  }
}

export const likeBlog = blog => {
  console.log('**************  reducer likeBlog', blog)
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
  console.log('**************  reducer removeBlog', blog.id)
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })
  }
}

export default reducer