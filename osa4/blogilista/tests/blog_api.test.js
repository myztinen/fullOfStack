const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('When requesting all blogs entries', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })

  test('id field in in response payload instead of _id field', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
    assert.ok(response.body[0]._id === undefined)
  })
})

describe('When posting a new entry', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "Tiitiaisen satupuu",
      author: "Teppo Tiitiainen",
      url: "http://wwww.testi.com",
      likes: 66
    }

    await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    const titles = response.body.map(r => r.title)
    const authors = response.body.map(r => r.author)
    const urls = response.body.map(r => r.url)
    const likes = response.body.map(r => r.likes)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('Tiitiaisen satupuu'))
    assert(authors.includes('Teppo Tiitiainen'))
    assert(urls.includes('http://wwww.testi.com'))
    assert(likes.includes(66))

  })

  test('likes value is 0 if it is missing', async () => {
    const newBlog = {
      title: "Tiitiaisen satupuu",
      author: "Teppo Tiitiainen",
      url: "http://wwww.testi.com"
    }

    await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await helper.blogsInDb()

    const likes = response.body.map(r => r.likes)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(likes.includes(0))
  })

  test('if title is missing, bad request is received', async () => {
    const newBlog = {
      author: "Teppo Tiitiainen",
      url: "http://wwww.testi.com"
    }

    await api.post('/api/blogs').send(newBlog)
      .expect(400)
  })

  test('if url is missing, bad request is received', async () => {
    const newBlog = {
      title: "Tiitiaisen satupuu",
      author: "Teppo Tiitiainen",
    }

    await api.post('/api/blogs').send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(n => n.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  })
})

describe('Updating of a blog', () => {
  test.only('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = {...blogsAtStart[0], likes: 100}

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert(likes.includes(100))
  })
})

after(async () => {
  await mongoose.connection.close()
})