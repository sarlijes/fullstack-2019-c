const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('blogs are returned', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('test valid id exists', () => {
  test('test that id is defined', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('get all glogs', () => {
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(2)
  })
})

describe('add a valid blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const response = await api.get('/api/blogs')
    const contents = blogsAtEnd.map(n => n.title)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(contents).toContain('First class tests')
  })
})

describe('try to add a blog without likes count', () => {
  test('blog without likes count', async () => {
    const newBlog = ({
      title: 'About Clean Code',
      author: 'Robert Jr',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const response = await api.get('/api/blogs')
    expect(response.body[blogsAtEnd.length - 1].likes).toBe(0)
  })

  describe('try to add a blog without title and url', () => {
    test('blog without title & content not added', async () => {
      const newBlog = {
        author: 'Robert Jr',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})