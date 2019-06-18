import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('../services/blogs.js')
import App from '../App'

describe('<App />', () => {

  // it('if no user logged, blogs are not rendered', async () => {
  //   const component = render(
  //     <App />
  //   )
  //   component.rerender(<App />)

  //   await waitForElement(
  //     () => component.getByText('login')
  //   )

  //   const loginForm = component.container.querySelector('.loginform')

  //   expect(loginForm).toBeDefined()

  // })

  describe('<App />', () => {
    it('if no user logged, notes are not rendered', async () => {
      const component = render(
        <App />
      )
      await waitForElement(
        () => component.getByText('login')
      )
    })

    // it('if user logged, notes are rendered', async () => {
    //   const user = {
    //     username: 'tester',
    //     token: '1231231214',
    //     name: 'Teuvo Testaaja'
    //   }

    //   localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    //   const component = render(
    //     <App />
    //   )

    //   // ....
    // })

  })
})