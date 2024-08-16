const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) =>{
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'empty username or password' })
    } 

    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(400).json({ error: 'invalid user' })
    }

    const correctpw = bcrypt.compare(password, user.passwordHash)
    if (!correctpw) {
        return res.status(400).json({ error: 'incorrect password' })
    }

    const userForToken = {
        username: username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn:60*60 })
    res.status(200).send({ token, username, name: user.name})
})

module.exports = loginRouter