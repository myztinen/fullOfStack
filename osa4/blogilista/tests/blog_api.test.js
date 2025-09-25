const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)



beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await helper.createTestUsers()
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

  test.only('a valid blog can be added ', async () => {
    const randomUser = await User.findOne({ username: 'perska' })
    const newBlog = {
      title: 'Tiitiaisen satupuu',
      author: 'Teppo Tiitiainen',
      url: 'http://wwww.testi.com',
      likes: 66,
      userId: randomUser.id
    }

    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer '.concat(loginResponse.body.token))
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    const titles = response.map(r => r.title)
    const authors = response.map(r => r.author)
    const urls = response.map(r => r.url)
    const likes = response.map(r => r.likes)

    assert.strictEqual(response.length, helper.initialBlogs.length + 1)
    assert(titles.includes('Tiitiaisen satupuu'))
    assert(authors.includes('Teppo Tiitiainen'))
    assert(urls.includes('http://wwww.testi.com'))
    assert(likes.includes(66))

  })

  test('likes value is 0 if it is missing', async () => {
    const randomUser = await User.findOne()
    const newBlog = {
      title: 'Tiitiaisen satupuu',
      author: 'Teppo Tiitiainen',
      url: 'http://wwww.testi.com',
      userId: randomUser.id
    }

    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer '.concat(loginResponse.body.token))
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await helper.blogsInDb()

    const likes = response.map(r => r.likes)

    assert.strictEqual(response.length, helper.initialBlogs.length + 1)
    assert(likes.includes(0))
  })

  test('if title is missing, bad request is received', async () => {
    const newBlog = {
      author: 'Teppo Tiitiainen',
      url: 'http://wwww.testi.com'
    }

    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer '.concat(loginResponse.body.token))
      .send(newBlog)
      .expect(400)
  })

  test('if url is missing, bad request is received', async () => {
    const newBlog = {
      title: 'Tiitiaisen satupuu',
      author: 'Teppo Tiitiainen',
    }

    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer '.concat(loginResponse.body.token))
      .send(newBlog)
      .expect(400)
  })

  test('user id and blog id are populated to new entries', async () => {
    const perskaUser = await User.findOne({ username: 'perska' })
    const newBlog = {
      title: 'Random blog',
      author: 'Bloggy Bloggersson',
      url: 'http://wwww.blog.blom',
      likes: 333,
      userId: perskaUser.id

    }
    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    const response = await api.post('/api/blogs').set('Authorization', 'Bearer '.concat(loginResponse.body.token)).send(newBlog)
    const { id } = response.body

    const blogsResponse = await api.get('/api/blogs')
    const addedBlog = blogsResponse.body.find(b => b.id === id)
    const usersResponse = await api.get('/api/users')
    const userWithBlogs = usersResponse.body.find(b => b.id === newBlog.userId)

    assert(userWithBlogs.blogs[0].id === addedBlog.id)
    assert(addedBlog.user.id === perskaUser.id)

  })

  test('if token is missing, 401 is received', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Tiitiaisen satupuu',
      author: 'Teppo Tiitiainen',
      url: 'http://wwww.blog.blom',

    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('Deletion of a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await helper.createTestUsers()
    const randomUser = await User.findOne({ username: 'perska' })
    const newBlog = {
      title: 'Tiitiaisen satupuu',
      author: 'Teppo Tiitiainen',
      url: 'http://wwww.testi.com',
      likes: 66,
      userId: randomUser.id
    }

    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer '.concat(loginResponse.body.token))
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const loginInfo = {
      username: 'perska',
      name: 'Perus Kayttaja',
      password: 'salasana'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', 'Bearer '.concat(loginResponse.body.token)).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    logger.info(blogsAtEnd)
    const titles = blogsAtEnd.map(n => n.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length-1)

  })

  test('fails with status code 401 if deleter is not creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const loginInfo = {
      username: 'tepondeeros',
      name: 'Teppo Kayttaja',
      password: 'salaisuus'
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    const deleteResponse = await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer '.concat(loginResponse.body.token)).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    assert.strictEqual(deleteResponse.body.error, 'token missing or invalid')


  })
})

describe('Updating of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = { ...blogsAtStart[0], likes: 100 }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)
    const blogsAtEnd = await helper.blogsInDb()

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    assert(likes.includes(100))
  })
})

after(async () => {
  await mongoose.connection.close()
})