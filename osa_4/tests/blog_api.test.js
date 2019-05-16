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
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
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
    expect(contents).toContain('Canonical string reduction')
  })
})

afterAll(() => {
  mongoose.connection.close()
})