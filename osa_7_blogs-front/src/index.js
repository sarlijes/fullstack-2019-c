import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import blogStore from './blogStore'
// import notificationStore from './notificationStore'

const render = () => {
  ReactDOM.render(
    <Provider store={blogStore} >
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
blogStore.subscribe(render)