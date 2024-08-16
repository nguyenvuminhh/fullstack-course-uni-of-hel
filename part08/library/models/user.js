const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    favoriteGenre: String
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)