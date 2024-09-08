const { BOOLEAN, INTEGER } = require('sequelize').DataTypes
const { Model } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
    },
    blog_id: {
        type: INTEGER,
        allowNull: false,
        references: {model: 'blogs', key: 'id'}
    },
    read: {
        type: BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readingList'
})

module.exports = ReadingList