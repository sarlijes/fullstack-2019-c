import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')

describe('App ', () => {

  test('if no user is logged, no blogs are rendered', async () => {

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).not.toHaveTextContent('React patterns')

  })

  test('when user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'lasse',
      name: 'Lasse Mantere',
      token: '5ce663984a93f01ea59fb796'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.getByText('Logged in as lasse'))

    expect(component.container).toHaveTextContent('React patterns')
  })
})