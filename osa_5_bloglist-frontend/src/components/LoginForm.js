import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, password }) => {

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div>
          username
          <input
            type={username.type}
            name={username.value}
            onChange={username.onChange}
          />
        </div>

        <div>
          password
          <input
            type={password.type}
            name={password.value}
            onChange={password.onChange}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm