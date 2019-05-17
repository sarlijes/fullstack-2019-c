const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    response.status(400).send({ error: 'title and url required' })
  } else {
    if (!blog.likes) blog.likes = 0
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = await request.body

  if (!body.likes) {
    response.status(400).send({ error: 'missing likes count' })
  } else {
    const blog = {
      likes: body.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(result)
  }
})

module.exports = blogsRouter