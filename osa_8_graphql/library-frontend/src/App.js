import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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

const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
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
        born
        id
      }
      published
      genres
      id
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

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [editBorn] = useMutation(EDIT_BORN)
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS}]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} editBorn={editBorn} result={authors}
      />

      <Books
        show={page === 'books'} result={books}
      />

      <NewBook
        show={page === 'add'} result={addBook}
      />

    </div>
  )
}

export default App