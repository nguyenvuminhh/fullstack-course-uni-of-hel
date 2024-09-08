const { INTEGER } = require('sequelize').DataTypes

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: INTEGER,
            validate: {
                min: 1991,
                max: new Date().getFullYear()
            }
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.removeColumn('blogs', 'year')
    }

}