import React from 'react'
import index from '../index.css'

const Notification = ({ notification }) => {

  // console.log('Notification ->', notification.error)

  if(notification.error) {
    return (
      <div className='true'>
        {notification.message}
      </div>
    )
  } else if (!notification.error){
    return (
      <div className='false'>
        {notification.message}
      </div>
    )
  }

}

export default Notification