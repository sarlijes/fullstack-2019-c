// from osa_6 Redux-anecdotes

// import React from 'react'
// import { connect } from 'react-redux'

// const Notification = (props) => {
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//     display:props.notification
//   }
//   return (
//     <div style={style}>
//       {props.notification}
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     notification: state.notification
//   }
// }

// const ConnectNotification = connect(mapStateToProps)(Notification)

// export default ConnectNotification


// osa 2(vanha)

import React from 'react'
import index from '../index.css'

const Notification = ({ notification }) => {

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