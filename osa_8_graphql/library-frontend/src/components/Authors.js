import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const SET_BORN_YEAR = gql`
mutation editAuthor($name: String!, $setBornTo: String!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  } 
}
`
const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [bornDate, setBornDate] = useState('')
  const [editAuthor] = useMutation(SET_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    await editAuthor({
      variables: {
        name: name,
        setBornTo: bornDate
      }
    })

    console.log('name and bornDate', name, bornDate)

    setName(authors[0].name)
    setBornDate('')
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
      <form onSubmit={submit}>
        <h2>Set birthyear</h2>
        <div>
        <select
          value={name}
          onChange={({ target }) => setName(target.value)}>
          {authors.map(author => {
            return (
              <option key={author.name} value={author.name}>{author.name}</option> 
            )
          })}
        </select>
      </div>
      <div>
        born
        <input
          value={bornDate}
          onChange={({ target }) => setBornDate(target.value)}
        />
      </div>
      <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors