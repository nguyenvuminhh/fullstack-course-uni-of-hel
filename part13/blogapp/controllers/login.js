const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const { User, Session } = require('../models/index')
const { tokenExtractor, currentUserExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
    const user = await User.findOne({where: {username: req.body.username}})
    if (!user) {
        res.status(400).json({error: 'Username or password is incorrect'})
        return
    }
    const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.passwordHash)
    if (!passwordIsCorrect) {
        res.status(400).json({error: 'Username or password is incorrect'})
        return
    }
    const userForToken = {username: user.username, id: user.id}
    await Session.destroy({
        where: {
            userId: user.id
        }
    })
    if (user.disabled) {
        res.status(401).json({error: 'User disabled'})
        return
    }
    const token = jwt.sign(userForToken, JWT_SECRET)
    await Session.create({
        token,
        userId: user.id
    })
    res.json({token, ...userForToken, name: user.name})
})

router.delete('/', tokenExtractor, currentUserExtractor, async (req, res, next) => {

    if (!req.currentUser) {
      res.status(404).json({error: "No user found"})
      return
    }
    await Session.destroy({ where: { userId: req.currentUser.id } })
    return res.status(200).json({ message: 'Logged out' })
})
module.exports = router