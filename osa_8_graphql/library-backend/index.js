const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('****** connected to MongoDB ******')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: String
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
  } 
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: () => Book.find({}).populate('author'),
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root.id })
      return books.length
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
    editAuthor: async (root, args) => {
      const { name, setBornTo } = args
      const filter = {
        name: name
      }
      const update = {
        born: setBornTo
      }

      try {
        // see - https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        const updatedAuthor = await Author.findOneAndUpdate(filter, update, {
          new: true
        })
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})