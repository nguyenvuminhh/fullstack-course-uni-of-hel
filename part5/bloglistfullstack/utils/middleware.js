const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
    res.status(400).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'unknown id', message: error.message })
    } else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        res.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'token expired, login again' })
    } else {
        res.json({error: error.message}).end()
        console.log('new error', error.message, error.name)
    }
}

const tokenExtractor = (req, res, next) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '')
        next()
        return
    }
    res.status(401).json({ error: 'token not found or wrongly formated' })
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken) {
        res.status(400).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        res.status(400).json({ error: 'user not found' })
    }

    req.user = user
    next()
}

module.exports = { errorHandler, unknownEndpoint, tokenExtractor, userExtractor, requestLogger }