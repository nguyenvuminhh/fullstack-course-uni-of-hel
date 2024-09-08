const router = require('express').Router()
const { Blog, User } = require('../models/index')
const { Op } = require('sequelize')
const { tokenExtractor, currentUserExtractor } = require('../util/middleware')

const blogExtractor = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const where = {}
    if (req.query.search) {
        const keyWord = '%' + req.query.search.trim() + '%'
        where[Op.or] = [
            { title: { [Op.iLike]: keyWord }},
            { author: { [Op.iLike]: keyWord }}
        ]
    }
    const blogs = await Blog.findAll({
        include: {
                model: User,
                attributes: ['name']
            },
        where
    })
    blogs.sort((a, b) => (a.likes - b.likes))
    res.send(blogs)
})

router.post('/', tokenExtractor, currentUserExtractor, async (req, res) => {
    const newBlog = await Blog.create({...req.body, userId: req.currentUser.id})
    res.send(newBlog)
})

router.delete('/:id', blogExtractor, tokenExtractor, currentUserExtractor, async (req, res) => {
    const blog = req.blog
    if (!blog) {
        res.status(400).json({error: "No blog found"})
    }
    if (req.currentUser.id !== blog.userId) {
        res.status(500).json({ error: 'You can only delete YOUR blog' })
        return
    }
    if (blog) {
        await blog.destroy()
        res.status(204)
        return
    }
    res.status(400)
})

router.put('/:id', blogExtractor, async (req, res) => {
    const blog = req.blog
    if (blog) {
        blog.likes = blog.likes + 1
        await blog.save()
        res.json(blog)
        return
    }
    res.status(400)
})

module.exports = router