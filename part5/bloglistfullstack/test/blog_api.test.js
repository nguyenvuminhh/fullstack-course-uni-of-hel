const supertest = require('supertest')
const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/testconst')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = helper.initialBlogs
const initialLength = initialBlogs.length


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
        name: 'name',
        username: 'username',
        passwordHash: passwordHash
    }) 

    for (const blog of initialBlogs) {
        const blogObject = new Blog({...blog, user: user._id})
        const savedBlog = await blogObject.save()
        user.blogs = user.blogs.concat(savedBlog._id)
    }
    await user.save()
})

test('get works as expected', async () => {
    const allBlogs = await api.get('/api/blogs/').expect(200)
    assert.strictEqual(initialLength, allBlogs.body.length)
})

test('unique identifier is id', async () => {
    const allBlogs = await helper.blogInDB()
    const arrayid = allBlogs.map(a => a.id)
    const array_id = allBlogs.map(a => a._id)
    assert(arrayid.every(a => typeof a === 'string'))
    assert(array_id.every(a => a === undefined))
})

test('post should be able to create a valid blog', async () => {
    const loginInfo = {
        username: 'username',
        password: 'password'
    }
    const loginRes = await api.post('/api/login/').send(loginInfo).expect(200)
    const token = loginRes.body.token
    const newBlog = {
        title: 'new',
        author: 'new',
        url: 'new',
        likes: 12
    }
    await api.post('/api/blogs')
             .set('Authorization', 'Bearer ' + token)
             .send(newBlog)
             .expect(201)
             .expect('Content-Type', /application\/json/)
    assert.strictEqual(initialLength + 1, (await helper.blogInDB()).length)

    const urls = (await helper.blogInDB()).map(a => a.url)
    assert(urls.includes(newBlog.url))
})

test('post should not be able to create a blog with no url', async () => {
    const loginInfo = {
        username: 'username',
        password: 'password'
    }
    const loginRes = await api.post('/api/login/').send(loginInfo).expect(200)
    const token = loginRes.body.token
    const newBlog = {
        title: 'new',
        author: 'new',
        url: '',
        likes: 12
    }
    const res = await api.post('/api/blogs')
                         .set('Authorization', 'Bearer ' + token)
                         .send(newBlog)
                         .expect(400)
    assert.strictEqual(initialLength, (await helper.blogInDB()).length)

    const urls = (await helper.blogInDB()).map(a => a.url)
    assert(!urls.includes(newBlog.url))
})

test('post should not be able to create a blog with no title', async () => {
    const loginInfo = {
        username: 'username',
        password: 'password'
    }
    const loginRes = await api.post('/api/login/').send(loginInfo).expect(200)
    const token = loginRes.body.token
    const newBlog = {
        title: '',
        author: 'new',
        url: 'new',
        likes: 12
    }
    const res = await api.post('/api/blogs')
                         .set('Authorization', 'Bearer ' + token)
                         .send(newBlog)
                         .expect(400)
    assert.strictEqual(initialLength, (await helper.blogInDB()).length)
    
    const urls = (await helper.blogInDB()).map(a => a.url)
    assert(!urls.includes(newBlog.url))
})

test('post should fill missing value of likes with 0', async () => {
    const loginInfo = {
        username: 'username',
        password: 'password'
    }
    const loginRes = await api.post('/api/login/').send(loginInfo).expect(200)
    const token = loginRes.body.token
    const newBlog = {
        title: 'new',
        author: 'new',
        url: 'new'
    }
    const res = await api.post('/api/blogs')
                         .set('Authorization', 'Bearer ' + token)
                         .send(newBlog)
                         .expect(201)
                         .expect('Content-Type', /application\/json/)
    assert.strictEqual(initialLength + 1, (await helper.blogInDB()).length)
    assert(res.body.likes === 0)
    const urls = (await helper.blogInDB()).map(a => a.url)
    assert(urls.includes(newBlog.url))
})

test('post should not be able to create a blog when a token is not provided', async () => {
    const newBlog = {
        title: 'new',
        author: 'new',
        url: 'new',
        likes: 12
    }
    const res = await api.post('/api/blogs')
                         .send(newBlog)
                         .expect(401)
    assert.strictEqual(initialLength, (await helper.blogInDB()).length)

    const urls = (await helper.blogInDB()).map(a => a.url)
    assert(!urls.includes(newBlog.url))
})

test('put works as expected', async () => {
    const loginInfo = {
        username: 'username',
        password: 'password'
    }
    const loginRes = await api.post('/api/login/').send(loginInfo).expect(200)
    const token = loginRes.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = (await Blog.find({})).find(a => a.user.toString() === decodedToken.id)._id.toString()
    const newBlog = {
        title: 'new',
        author: 'new',
        url: 'new',
        likes: 12
    }
    await api.put('/api/blogs/' + id)
             .set('Authorization', 'Bearer ' + token)
             .send(newBlog)
             .expect(200)
             .expect('Content-Type', /application\/json/)
    
    const current = await Blog.findById(id)
    assert.strictEqual((await helper.blogInDB()).length, initialLength)
    assert.strictEqual(current.title, newBlog.title)
    assert.strictEqual(current.author, newBlog.author)
    assert.strictEqual(current.url, newBlog.url)
    assert.strictEqual(current.likes, newBlog.likes)
})

test('delete works as expected', async () => {
    const loginInfo = {
        username: 'username',
        password: 'password'
    }
    const loginRes = await api.post('/api/login/').send(loginInfo).expect(200)
    const token = loginRes.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const id = (await helper.blogInDB()).find(a => a.user.toString() === decodedToken.id.toString()).id

    await api.delete('/api/blogs/' + id)
             .set('Authorization', 'Bearer ' + token)
             .expect(204)
    const currentLength = (await helper.blogInDB()).length
    assert.strictEqual(currentLength, initialLength - 1)
})

after(async () => {
    await mongoose.connection.close()
})