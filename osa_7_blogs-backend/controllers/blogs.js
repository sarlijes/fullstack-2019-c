const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const blogRemoved = await Blog.findById(request.params.id)
      if (blogRemoved.user.toString() === decodedToken.id.toString()) {
        const result = await Blog.findByIdAndRemove(request.params.id)
        response.status(204).json(result)
      } else {
        response.status(400).send({ error: 'allowed only to remove own blogs' })
      }
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(populatedBlog)
  } catch (exception) {
    next(exception)
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

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log('body -->', blog)

  if (!blog) {
    return response.status(400).send({ error: 'no blog on that id' }).end()
  }

  const comment = new Comment(request.body)
  comment.blog = blog._id
  console.log('comment --->', comment)

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = blogsRouter