import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient, useSubscription, ApolloConsumer } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { Subscription } from 'react-apollo'

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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
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

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    console.log('set token')
    setToken(window.localStorage.getItem('library-user-token'))
  }, [])

  const handleError = (error) => {
    try {
      setErrorMessage(error.graphQLErrors[0].message)
    } catch (e) {
      console.log(e)
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const genres = useQuery(ALL_GENRES)

  const books = useQuery(ALL_BOOKS, {
    variables: { genre },
    onError: handleError
  })

  const [editBorn] = useMutation(EDIT_BORN, { onError: handleError })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS, variables: { genre } }, { query: ALL_GENRES }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  const logout = () => {
    console.log("login out");
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommend')}>recommended</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token
          ? <button onClick={logout}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      {errorNotification()}
      <Authors show={page === 'authors'} editBorn={editBorn} result={authors} />

      <Books show={page === 'books'} result={books} genres={genres} setGenre={genre => setGenre(genre)} />

      <NewBook show={page === 'add'} result={addBook} />

      <ApolloConsumer>
        {(client =>
          <Recommend client={client} token={token} show={page === 'recommend'} />
        )}
      </ApolloConsumer>

      <LoginForm show={page === 'login'} setPage={setPage} login={login} setToken={token => setToken(token)} />

      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({ subscriptionData }) =>
          window.alert(`${subscriptionData.data.bookAdded.title} added`)
        }
      >
        {() => null}
      </Subscription>
    </div>
  )
}

export default App