const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(cors())
app.use(express.static('dist'))

let contacts = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get("/api/persons", (req, res) => {
  res.json(contacts)
})

app.get("/api/persons/:id", (req, res) => {
  const id = String(req.params.id)
  const result = contacts.find(a => a.id === id)
  if (result) {
    res.json(result)
  } else {
    res.status(404).end()
  }})

app.delete("/api/persons/:id", (req, res) => {
  const id = String(req.params.id)
  contacts = contacts.filter(a => a.id !== id)
  res.status(204).end()
})

app.put("/api/persons/:id", (req, res) => {
  const id = String(req.params.id)
  const index = contacts.findIndex(a => a.id === id)
  contacts[index].number = req.body.number
  res.json(contacts[index])
})

app.post("/api/persons", (req, res) => {
  const content = req.body
  if (content.name === '' || content.number === '') {
    res.status(400).json({error: "Missing name or number"})
  } else if (contacts.some(a => a.name === content.name)) {
    res.status(400).json({error: "Name must be unique"})
  } else {
    let id = Math.floor(Math.random() * 1000000)
    while (contacts.some(a => a.id === id)) {
      id = Math.floor(Math.random() * 1000000)
    }
    content.id = String(id)
    contacts.push(content)
    res.json(req.body)
  }
})

app.get("/api/info", (req, res) => {
  res.end("The phonebook has info for " + contacts.length + " people"+ "\n\n" + new Date())
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3002
app.listen(PORT)