require('dotenv').config()

const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET
const DATABASE_URL = process.env.DATABASE_URL

module.exports = { PORT, JWT_SECRET, DATABASE_URL }