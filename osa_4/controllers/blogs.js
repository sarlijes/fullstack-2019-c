const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
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

module.exports = blogsRouter