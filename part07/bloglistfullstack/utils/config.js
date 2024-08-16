require("dotenv").config()

let PORT = process.env.PORT
let URL =
  process.env.NODE_ENV === "test" ? process.env.URL_TEST : process.env.URL

module.exports = { PORT, URL }
