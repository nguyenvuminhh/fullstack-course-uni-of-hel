const app = require('./app')
const { connectToDB } = require('./util/db')
const { PORT } = require('./util/config')

const start = async () => {
    console.log('___________')
    await connectToDB()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start()