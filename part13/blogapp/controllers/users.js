const { User, Blog } = require('../models/index')
const bcrypt = require('bcryptjs')

const router = require('express').Router()

const userExtractor = async (req, res, next) => {
    const user = await User.findOne({where: {username: req.params.username}})
    req.user = user
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: Blog,
                attributes: { 
                    exclude: ['blogId'] 
                },
                through: {
                    attributes: []
                }
            }
        ]
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const checkUser = await User.findOne({where: {username: req.body.username}})
    if (checkUser) {
        res.status(400).json({error: "username unavailable"})
        return
    }
    const passwordHash = bcrypt.hashSync(req.body.password)
    const newUser = await User.create({
        passwordHash,
        username: req.body.username,
        name: req.body.name
    })
    res.json(newUser)
})

router.put('/:username', userExtractor, async (req, res) => {
    const user = req.user
    if (user && req.body.username) {
        user.username = req.body.username
        await user.save()
        res.json(user)
        return
    } else if (user) {
        user.disabled = req.body.disabled !== undefined ? req.body.disabled : user.disabled
        await user.save()
        res.json(user)
        return
    }

    res.status(400).json({error: "No user found"})
})

module.exports = router