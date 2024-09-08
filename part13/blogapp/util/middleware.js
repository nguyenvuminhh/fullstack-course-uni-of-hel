const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const { User } = require('../models/index')

const requestLogger = async (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('----------------')
    next()
}

const errorHandler = async (error, req, res, next) => {
    res.send(error)
    throw error
}


const tokenExtractor = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(500).json({ error: 'Authorization failed' })
        return
    }
    req.token = auth.substring(7)
    next()
}

const currentUserExtractor = async (req, res, next) => {
    const decodedToken = await jwt.verify(req.token, JWT_SECRET)
    const user = await User.findByPk(decodedToken.id)
    if (!user) {
        res.status(500).json({ error: 'Authorization failed' })
        return
    }
    req.currentUser = user
    next()
}

module.exports = { currentUserExtractor, tokenExtractor, requestLogger, errorHandler}