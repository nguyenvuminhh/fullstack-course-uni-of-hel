const { Model } = require('sequelize')
const { INTEGER, TEXT, DATE } = require('sequelize').DataTypes
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    unique: true,
    references: { model: 'users', key: 'id' },
  },
  token: {
    type: TEXT,
    allowNull: false,
    unique: true,
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
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'session',
})

module.exports = Session