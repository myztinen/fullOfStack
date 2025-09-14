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

app.use(express.static('dist'))
app.use(express.json())



  let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })})

app.get('/info', (request, response) => {
    const date = new Date()

  response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${date}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
    } else {
        response.status(404).end()  
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

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


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})