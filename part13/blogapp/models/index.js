const User = require('./users')
const Blog = require('./blogs')
const ReadingList = require('./reading_list')
const Session = require('./session');
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList})
Blog.belongsToMany(User, {through: ReadingList})

module.exports = { Session, User, Blog }