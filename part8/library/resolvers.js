const Author = require('./models/author')
const Book = require('./models/book')
const { configIdArray, configIdObject } = require('./helper')
const bcrypt = require('bcryptjs')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          const author = await Author.findOne({ name: args.author })
          const authorid = author ? author._id : null
          const temp = args.author ? (await Book.find({ author: authorid }).populate('author') ): (await Book.find({}).populate('author'))
          const result = args.genre !== "all genres" ? temp.filter(a => a.genres.includes(args.genre)) : temp
          return configIdArray(result)
      },
      allAuthors: async () => {
          const authors = await Author.find({}).populate('books')
          return configIdArray(authors)
      },
      allGenres: async () => {
          return (await Book.find({})).flatMap(a => a.genres)
      },
      me: async (root, args, context) => {
          return context.currentUser
      }
    },
    Author: {
      name: (root) => root.name,
      born: (root) => root.born,
      id: (root) => root.id,
      books: (root) => root.books,
      bookCount: (root) => root.books.length
    },
    Mutation: {
      addBook: async (root, args, context) => {
          if (!context.currentUser) {
              throw new Error('Unauthorized')
          }
          if (!Object.values(args).every(a => a)) {
              throw new Error('Required fields cannot be empty or missing')
          }
          let author = await Author.findOne({name: args.author})
          if (!author) {
              const newAuthor = new Author({name: args.author})
              await newAuthor.save()
              author = newAuthor
          }
          const newBook = new Book({
              title: args.title,
              author: author._id,
              published: args.published,
              genres: args.genres
          })
  
          await author.books.push(newBook._id)
          
          await newBook.save()
          await author.save()
          const result = configIdObject(await newBook.populate('author'))
          pubsub.publish('BOOK_ADDED', {bookAdded: result})
          return result
      },
      editAuthor: async (root, args, context) => {
          if (!context.currentUser) {
              throw new Error('Unauthorized')
          }
          if (!Object.values(args).every(a => a)) {
              throw new Error('Required fields cannot be empty or missing')
          }
          const author = await Author.findOne({name: args.name})
          if (!author) {
              return null
          }
  
          author.born = args.setBornTo
          await author.save()
          return configIdObject(author)
      },
      createUser: async (root, args) => {
          if ((await User.findOne({username: args.username}))){
              throw new Error('username existed, choose another one')
          }
          const passwordHash = await bcrypt.hash(args.password, 10)
          const newUser = new User({
              username: args.username,
              passwordHash,
              favoriteGenre: args.favoriteGenre
          })
          await newUser.save()
          return newUser
      },
      login: async (root, args) => {
          const user = await User.findOne({username: args.username})
          if (!user){
              throw new Error('username or password is incorrect')
          }
          const correct = await bcrypt.compare(args.password, user.passwordHash)
          if (!correct){
              throw new Error('username or password is incorrect')
          }
          const userForToken = {
              id: user._id,
              username: user.username
          }
          const token = jwt.sign(userForToken, process.env.SECRET, {
              expiresIn: 60 * 60,
          })
          return {value: token}
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
  }
  
module.exports = resolvers