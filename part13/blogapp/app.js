const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const authorRouter = require('./controllers/author')

const cors = require('cors')
const express = require('express')
const { requestLogger, errorHandler } = require('./util/middleware')
require('express-async-error')

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.get('/api/ping', (req, res) => {
    res.send('pong');
});
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use(errorHandler)
app.use((req, res, next) => res.status(404).json({error: "unknown endpoint"}))

module.exports = app


