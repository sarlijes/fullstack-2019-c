import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')
  const token = localStorage.getItem('library-user-token')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    await props.editBorn({
      variables: {
        name: name,
        bornYear: bornYear
      }
    })

    setName(authors[0].name)
    setBornYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token &&
        <div>
          <form onSubmit={submit}>
            <h2>Set birthyear</h2>
            <div>
              <select value={name} onChange={({ target }) => setName(target.value)}>
                <option>Make your choice</option>
                {authors.map(author => {
                  return (
                    <option key={author.name} value={author.name}>{author.name}</option>
                  )
                })}
              </select>
            </div>
            <div>
              born
        <input value={bornYear} onChange={({ target }) => setBornYear(parseInt(target.value, 10))} />
            </div>
            <button type='submit'>update author</button>
          </form>
        </div>}
    </div>
  )
}

export default Authors