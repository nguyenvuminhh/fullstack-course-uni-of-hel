const { INTEGER, BOOLEAN } = require('sequelize').DataTypes

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('reading_lists', {
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
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('reading_list')
    }
}