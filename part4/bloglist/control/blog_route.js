const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')
require('express-async-errors')

blogRouter.get('/', (req, res) => {
    Blog
      .find({})
      .populate('user')
      .then(blogs => {
        res.json(blogs)
      })
})

blogRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
    const user = req.user
    if (!user) {
      res.status(401).json({ error: 'user not found' })
    }
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
  const userID = req.user._id.toString()
  const blogUserID = (await Blog.findById(req.params.id)).user.toString()
  if (userID !== blogUserID) {
    return res.status(401).json({ error: 'you are not the blog\'s creator'})
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
  const userID = req.user._id.toString()
  const blogUserID = (await Blog.findById(req.params.id)).user.toString()
  if (userID !== blogUserID) {
    res.status(401).json({ error: 'you are not the blog\'s creator' })
  }
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, context: 'query'})
  res.json(result)
})

blogRouter.delete('/', async (req, res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})


module.exports = blogRouter

