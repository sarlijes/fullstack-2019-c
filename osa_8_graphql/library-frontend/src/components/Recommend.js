import React, { useState, useEffect } from 'react'
import queries from '../requests/queries'


const Recommend = props => {
  const [recommended, setRecommended] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      getBooks()
    }
  })

  useEffect(() => {
    const getUser = async () => {
      const response = await props.client.query({
        query: queries.ME,
        fetchPolicy: 'no-cache'
      })
      setUser(response.data.me)
    }
    getUser()
  })

  const getBooks = async () => {
    const response = await props.client.query({
      query: queries.ALL_BOOKS,
      variables: { genre: user.favoriteGenre },
      fetchPolicy: 'no-cache'
    })
    setRecommended(response.data.allBooks)
  }

  if (!props.show) {
    return null
  }

  if (!recommended) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h2>recommended books</h2>
      Books in your favorite genre <strong>{user ? user.favoriteGenre : null}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
                      </th>
            <th>
              published
                  </th>
          </tr>
          {recommended.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend