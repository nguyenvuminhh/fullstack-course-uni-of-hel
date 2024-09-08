const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)
const migrationConf = {
    migrations: {
        glob: 'migration/*.js',
    },
    storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
    context: sequelize.getQueryInterface(),
    logger: console
}
const runMigration = async () => {
    const migrator = new Umzug(migrationConf)

    const migrations = await migrator.up()

    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}
const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConf)
    await migrator.down()
  }
const connectToDB = async () => {
    try {
        await sequelize.authenticate()
        await runMigration()
        console.log('Connected successfully')
    } catch (error) {
        console.log('Failed to connect', error)
        process.exit(1)
    }

    return null
}

module.exports = { rollbackMigration, sequelize, connectToDB }