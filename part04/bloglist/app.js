const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./control/blog_route')
const userRouter = require('./control/user_route')
const loginRouter = require('./control/login_route')
const { errorHandler, unknownEndpoint, tokenExtractor, userExtractor } = require('./utils/middleware')
const mongoUrl = config.URL

app.use(express.json())
mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)

app.use(cors())
// app.use(tokenExtractor)
// app.use(userExtractor)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app
