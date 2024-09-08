
const { TEXT, INTEGER, DATE, BOOLEAN } = require('sequelize').DataTypes

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('users', {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: TEXT,
                allowNull: false,

            },
            username: {
                type: TEXT,
                unique: true,
                allowNull: false,
            },
            password_hash: {
                type: TEXT,
                allowNull: false
            },
            created_at: {
                type: DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            updated_at: {
                type: DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            disabled: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }
        })

        await queryInterface.createTable('blogs', {
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
            }
        })

        await queryInterface.addColumn('blogs', 'user_id', {
                type: INTEGER,
                allowNull: false,
                references: {model: 'users', key: 'id'},
                onDelete: 'CASCADE'
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    }
}