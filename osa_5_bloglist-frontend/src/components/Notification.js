import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {message.message}
    </div>
  )
}

export default Notification