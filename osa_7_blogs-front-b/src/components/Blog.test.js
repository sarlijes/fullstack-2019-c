import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'

afterEach(cleanup)

describe('Blog', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu reactissa',
    author: 'Simo',
    url: 'www://koodi',
    likes: 5,
    user: {
      id: 'simo',
      name: 'user',
      username: 'user'
    }
  }

  const user = {
    id: 'simo',
    username: 'user'
  }

  test('renders name and author', () => {
    const component = render(<Blog blog={blog} user={user} />)
    expect(component.container).toHaveTextContent(
      'Komponenttitestaus tapahtuu reactissa'
    )
  })

  test('renders full details after click', () => {

    const component = render(
      <Blog blog={blog} user={user} />
    )

    const button = component.container.querySelector('.toggle')

    // const button = getByText('')
    // fireEvent.click(button)

    // console.log(prettyDOM(button))
    // fireEvent.click(button)
    // expect(component.container).toHaveTextContent(
    //   'Komponenttitestaus tapahtuu reactissa by: user'
    // )
  })

})