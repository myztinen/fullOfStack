require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()


morgan.token('body', (req) => {
  return req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''})

morgan.format('POST', ':method :url :status :res[content-length] - :response-time ms :body')

app.use(morgan('POST', {
  skip: (req, res) => req.method !== 'POST'
}))

app.use(morgan('tiny', {
  skip: (req, res) => req.method === 'POST'
}))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}


app.use(express.static('dist'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.countDocuments({}).then(count => {
      console.log(count)
      response.send(`<div>Phonebook has info for ${count} people</div><div>${date}</div>`)
     })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedEntry) => {
        response.json(updatedEntry)
      })
    })
    .catch(error => next(error))})



app.post('/api/persons', (request, response) => {  
    const body = request.body  

    if (!checkPayload(body)) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const checkPayload = (person) => {
  if(!person.name || !person.number) return false

  if(person.name === null || person.name === '') return false

  if(person.number === null || person.number === '') return false

  return true
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})