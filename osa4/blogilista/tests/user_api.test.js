const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)



describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ name:'Paa Kayttaja', username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    logger.info(usersAtStart)
    const newUser = {
      'username': 'Kurkku',
      'name': 'Kullervo Kayttaja',
      'password': 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('user info can be fetched', async () => {
    const response = await api.get('/api/users')

    assert.strictEqual(response.body[0].username, 'root')
    assert.strictEqual(response.body[0].name, 'Paa Kayttaja')
    assert.strictEqual(response.body[0].password, undefined)
  })

  test('password must be at least 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'perska',
      'name': 'Perus Kayttaja',
      'password': 'sa'
    }

    const response =  await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(response.body.error.includes('Password must be at leas 3 chracters long'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('username must be at least 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'pe',
      'name': 'Perus Kayttaja',
      'password': 'salasana'
    }

    const response =  await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(response.body.error.includes('Username must be at leas 3 chracters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Paa Kayttaja',
      password: 'salainen',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(response.body.error.includes('Expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})



after(async () => {
  await mongoose.connection.close()
})