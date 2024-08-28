const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
morgan.token('req-body', (req, _res) => JSON.stringify(req.body))

app.use(cors())
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL
console.log(url)

mongoose.connect(url).then(() =>
  console.log('connected')
).catch((e) => console.log(e.message))


// app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(router)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (e, req, res, next) => {
  if (e.name === 'CastError') {
    res.status(400).send({ error:'Incorrect id' })
  } else if (e.name === 'ValidationError') {
    res.status(400).json({ error: e.message })
    throw(e)
  } else {
    console.log(e)
    res.send({ error: e.message })
  }

  next(e)
}

app.use(errorHandler)

module.exports = app