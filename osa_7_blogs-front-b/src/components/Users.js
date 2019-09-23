import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = props => {
  useEffect(() => {
    props.initializeUsers()
  }, [])

  const users = props.users.map(user => {
    return (
      <tr key={user.id}>
        <td><Link to={`${props.path}/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Users </h2>
      <table>
        <tbody>
          <tr>
            <th></th><th>blogs created</th>
          </tr>
          {users}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { initializeUsers })(Users)