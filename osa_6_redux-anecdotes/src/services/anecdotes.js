import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content: content,
    votes: 0
  }
  const res = await axios.post(url, newAnecdote)
  return res.data
}

const get = async (id) => {
  const response = await axios.get(`${url}/${id}`)
  return response.data
}

const update = async (id, content) => {
  const response = await axios.put(`${url}/${id}`, content)
  return response.data
}

export default {
  getAll,
  createNew,
  get,
  update
}