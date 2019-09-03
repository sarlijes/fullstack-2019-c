import React from 'react'
import { connect } from 'react-redux'
import '../index.css'

const Notification = ({ notification }) => {
  const style = notification.error ? 'false' : 'true'

  return (
    <div className={style}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectNotification = connect(mapStateToProps)(Notification)

export default ConnectNotification