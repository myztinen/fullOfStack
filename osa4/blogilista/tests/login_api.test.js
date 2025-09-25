const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const api = supertest(app)



describe('When doing a login ', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ name:'Paa Kayttaja', username: 'root', passwordHash })

    await user.save()
  })

  test('auth token is returned when password is correct', async () => {

    const randomUser = await User.findOne({ username: 'root' })


    const loginInfo = {
      username: randomUser.username,
      name: randomUser.name,
      password: 'sekret'
    }

    const response = await api.post('/api/login').send(loginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(response.body.token !== undefined)
  })

  test('auth token is not returned when password is not correct', async () => {

    const randomUser = await User.findOne({ username: 'root' })


    const loginInfo = {
      username: randomUser.username,
      name: randomUser.name,
      password: 'lllll'
    }

    const response = await api.post('/api/login').send(loginInfo)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(response.body.token === undefined)
    assert(response.body.error === 'invalid username or password')

  })
})



after(async () => {
  await mongoose.connection.close()
})