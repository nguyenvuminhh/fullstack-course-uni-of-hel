const { ApolloServer } = require('@apollo/server')
const typeDefs = require('./typeDef')
const resolvers = require('./resolvers')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/user')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const jwt = require('jsonwebtoken')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
dotenv.config()

const url = process.env.MONGOOSE_URI

mongoose.connect(url)
  .then(() => { 
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
      })
      
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
            },
        ],
    })

    await server.start()

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.startsWith('Bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser }
            }
            return null
        },
        }),
)

const PORT = 4000

httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
)
}

start()