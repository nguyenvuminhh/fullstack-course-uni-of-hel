const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "title1",
        author: "nguyen1",
        url: "url1",
        likes: 12
    },
    {
        title: "title2",
        author: "nguyen2",
        url: "url1",
        likes: 123
    },
    {
        title: "title3",
        author: "nguyen3",
        url: "url1",
        likes: 112
    }
]

const blogInDB = async () => {
    return (await Blog.find({})).map(a => a.toJSON())
}

const userInDB = async () => {
    return (await User.find({})).map(a => a.toJSON())
}

const initialUsers = [
    {
        name: "name1",
        username: "username1",
        password: "password"
    },
    {
        name: "name2",
        username: "username2",
        password: "password"
    },
    {
        name: "name3",
        username: "username3",
        password: "password"
    },
    {
        name: "name4",
        username: "username4",
        password: "password"
    }    
]

module.exports = { blogInDB, initialBlogs, userInDB, initialUsers }
