import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Header, Table } from 'semantic-ui-react'

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
      <br></br>
      <Header>Users </Header>
      <Table>
        <tbody>
          <tr>
            <th></th><th>blogs created</th>
          </tr>
          {users}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { initializeUsers })(Users)