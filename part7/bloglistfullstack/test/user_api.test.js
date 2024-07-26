const app = require("../app")
const supertest = require("supertest")
const assert = require("assert")
const { test, beforeEach } = require("node:test")
const User = require("../models/user")
const helper = require("../utils/testconst")

const api = supertest(app)

const initialUsers = helper.initialUsers
const initialLength = initialUsers.length

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const newUser = new User(user)
    await newUser.save()
  }
})

test("should be able to create user", async () => {
  const newUser = {
    name: "new",
    username: "newnew",
    password: "newnewnew",
  }
  await api
    .post("/api/users/")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const current = await helper.userInDB()
  const usernames = current.map((a) => a.username)
  assert(usernames.includes(newUser.username))
  assert.equal(current.length, initialLength + 1)
})
