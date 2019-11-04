import { gql } from 'apollo-boost'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {
    name
    born
    bookCount
  }
  published
  genres
}
`

const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_GENRES = gql`
{
  allBooks {
    genres
  }
}
`
const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $bornYear: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $bornYear) 
      {
      name
      born
      id
    }
  }
`

const ME = gql`
query me {
  me {
    username
    favoriteGenre
  }
}
`

export default { ALL_AUTHORS, ALL_GENRES, ALL_BOOKS, ADD_BOOK, BOOK_DETAILS, BOOK_ADDED, ME, EDIT_BORN, LOGIN }