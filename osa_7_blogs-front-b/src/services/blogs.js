import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const deleteToken = () => {
  token = null
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const addComment = async (id, comment) => {
  console.log('id: commnet:', id, comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, getById, create, setToken, update, remove, deleteToken, addComment }