require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require("./modules/contact")

app.use(express.static('dist'))
app.use(express.json())
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(cors())

app.get("/api/persons", (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  const id = String(req.params.id)
  Contact.findById(id).then((contact) => {
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).end()
    }
  }).catch(e => next(e))
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = String(req.params.id)
  Contact.findByIdAndDelete(id)
         .then(() => res.status(204).end())
         .catch(e => next(e))
})

app.put("/api/persons/:id", (req, res, next) => {
  const id = String(req.params.id)
  const newContact = req.body
  Contact.findByIdAndUpdate(id, newContact, {new: true,  runValidators: true, context: 'query'})
         .then(result => res.json(result))
         .catch(e => next(e))
})

app.post("/api/persons", (req, res, next) => {
  const content = req.body
  
  Contact.find({name: content.name}).then(result => {
    let unique = true
    if (result.length > 0) {
      unique = false
    }
    if (content.name === '' || content.number === '') {
      res.status(400).json({error: "Missing name or number"})
    } else if (!unique) {
      res.status(400).json({error: "Name must be unique"})
    } else {
      const contact = new Contact({
        name:content.name,
        number:content.number
      })
      contact.save()
             .then(() =>res.json(contact))
             .catch(e => {
        console.log("caught here")
        next(e)
      })
    }
  })//.catch(e => next(e))
})

app.get("/api/info", (req, res) => {
  Contact.find({}).then(contacts => {
    res.end("The phonebook has info for " + contacts.length + " people"+ "\n\n" + new Date())
  }).catch(e => next(e))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (e, req, res, next) => {
  if (e.name === 'CastError') {
    res.status(400).send({error:'Incorrect id'})
  } else if (e.name === 'ValidationError') {
    res.status(400).json({ error: e.message })
    throw(e)
  } else {
    res.send({ error: e.message })
  }

  next(e)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT)