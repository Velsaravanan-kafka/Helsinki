// backend/index.js
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = 'tiny'

// --- MIDDLEWARE ---
app.use(express.json()) // To parse JSON request bodies
app.use(cors())         // To allow requests from your frontend
app.use(express.static('dist')) // To serve the frontend's production build
app.use(require('morgan')(morgan)) // To log HTTP requests

// --- DATA ---
let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
]

// --- ROUTES ---
// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Get info page
app.get('/info', (req, res) => {
  const personCount = persons.length
  const requestTime = new Date()
  res.send(
    `<p>Phonebook has info for ${personCount} people</p>
     <p>${requestTime}</p>`
  )
})

// Get a single person
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// Add a new person
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: Math.floor(Math.random() * 10000), // Simple ID generation
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)
})

// --- SERVER START ---
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})