const { Model } = require('sequelize')
const { INTEGER, TEXT, DATE, BOOLEAN } = require('sequelize').DataTypes

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: TEXT,
        allowNull: false,
        validate: {
            len: [5,20]
        }
    },
    username: {
        type: TEXT,
        unique: true,
        allowNull: false,
        validate: {
            // the line below is from Google Gemini
            is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    },
    passwordHash: {
        type: TEXT,
        allowNull: false
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    disabled: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'user'
})

module.exports = User