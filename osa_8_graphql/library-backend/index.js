const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const JWT_SECRET = process.env.SECRET
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: String        # String
    bookCount: Int
    id: ID!
  }
  type Book {         # given def
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    me: User
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]
    allBooks(author: String, genre: String): [Book!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
      ): User
    login(
      username: String!
      password: String!
      ): Token
  } 
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      const byAuthor = book => book.author.name === args.author
      
      if (args.author && !args.genre) {
        return books.filter(byAuthor)
      } else if (!args.author && args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre]}})        
        return books
      } else if (args.author && args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre]}}).populate('author')
        return books.filter(byAuthor)
      } else {
        return books
      }
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)      
      return {
        name: author.name,
        born: author.born
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const { title, published, author, genres } = args
      const authorDuplicate = await Author.findOne({ name: author })
      if (authorDuplicate) {
        authorId = authorDuplicate.id
      } else {
        const newAuthor = new Author({ name: author })
        try {
          await newAuthor.save()
          authorId = newAuthor.id
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const newBook = new Book({
        title,
        published,
        author: authorId,
        genres
      })
      try {
        await newBook.save()
        return Book.findById(newBook.id).populate('author')
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      
      author.name = args.name,
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})
      console.log('login args', args.password)
      console.log('login user', user)

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id).populate('books')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})