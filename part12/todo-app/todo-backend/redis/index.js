const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL, MONGO_URL } = require('../util/config') // REDIS_URL=redis://localhost:6379
const { Todo } = require('../mongo')

let getAsync = async () => {}
let setAsync = async () => {}

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL,
    database: 0
  })
  console.log(1111111, MONGO_URL)
  console.log(2222222, REDIS_URL)
  // console.log(client.options)
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    
}

module.exports = {
  getAsync,
  setAsync
}