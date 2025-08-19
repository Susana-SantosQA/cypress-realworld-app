class LoginPage {
  elements = {
    usernameInput: () => cy.get('#username'),
    passwordInput: () => cy.get('#password'),
    submitButton: () => cy.get('[type="submit"]'),
    logo: () => cy.get('.NavBar-logo'),
    errorMessage: () => cy.get('[role="alert"]')
  }

  visit() {
    cy.visit('http://localhost:3000/')
  }

  login(username, password) {
    this.elements.usernameInput().type(username)
    this.elements.passwordInput().type(password)
    this.elements.submitButton().click()
  }
}

module.exports = new LoginPage()
