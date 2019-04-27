import React from 'react'

const Notification = ({ notificationMessage }) => {
  if (notificationMessage === null) {
    return null
  }
  return (
    <div className='notification'>
      {notificationMessage}
    </div>
  )
}

export default Notification