describe('App is loading', () => {
  it('Visits the login page', () => {
    cy.visit('/')
    cy.contains('Welcome Back !')
  })
})
