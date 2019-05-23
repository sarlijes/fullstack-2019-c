const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  let user = {}
  if (!body.userId) {
    const users = await User.find({})
    user = users.map(user => user.toJSON())[1]
    console.log('----->>', user)
  } else {
    user = await User.findById(body.userId)
  }

  if (!body.title || !body.url) {
    response.status(400).send({ error: 'title and url required' })
  } else {
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      user: user._id,
      likes: typeof body.likes === 'undefined' ? 0 : body.likes
    })
    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch (exception) {
      next(exception)
    }
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