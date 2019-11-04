import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { Subscription } from 'react-apollo'
import queries from './requests/queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    // console.log('set token')
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

  const authors = useQuery( queries.ALL_AUTHORS)
  const genres = useQuery(queries.ALL_GENRES)

  const books = useQuery(queries.ALL_BOOKS, {
    variables: { genre },
    onError: handleError
  })

  const [editBorn] = useMutation(queries.EDIT_BORN, { onError: handleError })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(book => book.title).includes(object.title)

    const dataInStore = client.readQuery({
      query: queries.ALL_BOOKS,
      variables: { genre }
    })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: queries.ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(queries.BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(queries.ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: queries.ALL_AUTHORS }, { query: queries.ALL_BOOKS, variables: { genre } }, { query: queries.ALL_GENRES }],
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [login] = useMutation(queries.LOGIN, {
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

      <Recommend client={client} token={token} show={page === 'recommend'} />

      <LoginForm show={page === 'login'} setPage={setPage} login={login} setToken={token => setToken(token)} />

      <Subscription
        subscription={queries.BOOK_ADDED}
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