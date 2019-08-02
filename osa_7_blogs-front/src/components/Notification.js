import React from 'react'
import { connect } from 'react-redux'
import '../index.css'

const Notification = (props) => {
  const style = props.notification.error ? 'false' : 'true'

  return (
    <div className={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state
  }
}

const ConnectNotification = connect(mapStateToProps)(Notification)

export default ConnectNotification