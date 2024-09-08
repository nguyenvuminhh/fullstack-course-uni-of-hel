const { Model } = require('sequelize')
const { INTEGER, TEXT } = require('sequelize').DataTypes
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: TEXT
    },
    url: {
        type: TEXT,
        allowNull: false
    },
    title: {
        type: TEXT,
        allowNull: false
    },
    likes: {
        type: INTEGER,
        defaultValue: 0
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
})

module.exports = Blog