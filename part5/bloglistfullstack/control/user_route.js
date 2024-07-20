const userRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (req, res) => {
    const {name, username, password} = req.body
    if (username.length <= 3) {
        return res.json({error: 'the lenght of username must be greater than 3'})
    } else if (password.length <= 3) {
        return res.json({error: 'the lenght of password must be greater than 3'})
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ name, username, passwordHash })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const allUsers = await User.find({}).populate('blogs')
    res.json(allUsers)
})

userRouter.delete('/', async (req, res) => {
    await User.deleteMany({})
    res.status(204).end()
})

module.exports = userRouter

