const { INTEGER, TEXT, DATE } = require('sequelize').DataTypes

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
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
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('session')
    }
}