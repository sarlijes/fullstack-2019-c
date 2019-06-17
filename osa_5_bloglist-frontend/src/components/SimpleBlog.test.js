import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import Blog from './SimpleBlog'


test('renders content', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu reactissa',
    author: 'Simo',
    likes: 10
  }

  afterEach(cleanup)


  const component = render(<Blog blog={blog} />)
  const MyBlog = component.container.querySelector('.MyBlog')
  const Likes = component.container.querySelector('.Likes')

  component.debug()

  expect(MyBlog).toHaveTextContent('Komponenttitestaus tapahtuu reactissa')
  expect(MyBlog).toHaveTextContent('Simo')

  expect(Likes).toHaveTextContent('blog has 10 likes')

})