const express = require('express')
const morgan = require('morgan')
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
  response.json(persons)
})

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
    const person = request.body  
    const newId = persons.length > 0 ? (Math.floor(Math.random()*1000000) ): 0

    if (!checkPayload(person)) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    if(persons.find(existing => 
      existing.name.toLowerCase() === person.name.toLowerCase())) {
      return response.status(409).json({ 
        error: 'Duplicate name' 
      })
    }
    
    person.id = String(newId)

    persons = persons.concat(person)
    response.json(person)
})

const checkPayload = (person) => {
  if(!person.name || !person.number) return false

  if(person.name === null || person.name === '') return false

  if(person.number === null || person.number === '') return false

  return true
}


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})