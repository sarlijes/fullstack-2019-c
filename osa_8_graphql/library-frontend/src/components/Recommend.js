import React from 'react'

const Recommend = props => {
  if (!props.show) {
    return null
  } 

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks
  console.log(books);

  return (
    <div>
      <h2>recommended books</h2>

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
          {books
            .filter(book => book.genres.includes(props.user.favoriteGenre))
            .map(a =>
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