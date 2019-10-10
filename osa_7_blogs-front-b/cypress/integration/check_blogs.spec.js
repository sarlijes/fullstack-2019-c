describe('Blogilista ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/tests/reset')
    const user = {
      name: 'admin',
      username: 'admin',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Login')
  })

  describe('user can log in and logout', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.contains('username')
      cy.get('#username').type('admin')
      cy.get('#password').type('secret')
      cy.get('[data-cy=login]').click()
    })

    it('name of the user is shown', function () {
      cy.contains('admin logged in')
    })

    it('user can logout', function () {
      cy.contains('logout').click()
      cy.contains('login')
    })
  })


  describe('a new blog can be created', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.contains('username')
      cy.get('#username').type('admin')
      cy.get('#password').type('secret')
      cy.get('[data-cy=login]').click()
    })

    it('name of the user is shown', function () {
      cy.contains('admin logged in')
    })

    it('one blog is created', function () {
      cy.contains('add').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://www')
      cy.get('[data-cy=Add]').click()
      cy.contains('add').click()

      it('user can logout', function () {
        cy.contains('logout').click()
        cy.contains('login')
      })

    })
  })

  describe('add a like to a blog', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.contains('username')
      cy.get('#username').type('admin')
      cy.get('#password').type('secret')
      cy.get('[data-cy=login]').click()
    })

    it('name of the user is shown', function () {
      cy.contains('admin logged in')
    })

    it('one blog is created', function () {
      cy.contains('add').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://www')
      cy.get('[data-cy=Add]').click()
      cy.contains('add').click()
      cy.get('#blogsList').click()
      cy.contains('cypress test blog cypress').click()
      cy.contains('like').click()
      cy.contains('cypress test blog cypress').click()
      cy.screenshot()
    })

    it('user logout', function () {
      cy.contains('logout').click()
      cy.contains('login')
    })

  })

  describe('add a comment to a blog', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.contains('username')
      cy.get('#username').type('admin')
      cy.get('#password').type('secret')
      cy.get('[data-cy=login]').click()
    })

    it('name of the user is shown', function () {
      cy.contains('admin logged in')
    })

    it('one blog is created', function () {
      cy.contains('add').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://www')
      cy.get('[data-cy=Add]').click()
      cy.contains('add').click()
      cy.get('#blogsList').click()
      cy.contains('cypress test blog cypress').click()
      cy.get('#commentInput').type('cypress test comment #1')
      cy.get('#addComment').click()
      cy.wait(500)
      cy.screenshot()
    })

    it('user logout', function () {
      cy.contains('logout').click()
      cy.contains('login')
    })
  })

})