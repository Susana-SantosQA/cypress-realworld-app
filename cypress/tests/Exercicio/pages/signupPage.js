class SignupPage {
  elements = {
    linkSignup: () => cy.get('[href="/signup"]'),
    firstNameInput: () => cy.get('[name="firstName"]'),
    lastNameInput: () => cy.get('[name="lastName"]'),
    usernameInput: () => cy.get('[name="username"]'),
    passwordInput: () => cy.get('[name="password"]'),
    confirmPasswordInput: () => cy.get('[name="confirmPassword"]'),
    submitButton: () => cy.get('[data-test="signup-submit"]'),
    errorMessage: () => cy.get('[role="alert"]'),
  }

  visit() { cy.visit('http://localhost:3000/') }
  goToSignup() { this.elements.linkSignup().click() }

  // type seguro: se "", faz clear()+blur() para disparar validação visual
  #safeType(inputGetter, value) {
    if (value === undefined) return
    if (value === "") {
      inputGetter().clear().blur()
    } else {
      inputGetter().clear().type(value).blur()
    }
  }

  fillForm(firstName, lastName, username, password, confirmPassword) {
    this.#safeType(this.elements.firstNameInput, firstName)
    this.#safeType(this.elements.lastNameInput, lastName)
    this.#safeType(this.elements.usernameInput, username)
    this.#safeType(this.elements.passwordInput, password)
    this.#safeType(this.elements.confirmPasswordInput, confirmPassword)
  }

  submit({ force = false } = {}) {
    this.elements.submitButton().click({ force })
  }

  assertSubmitDisabled() {
    this.elements.submitButton().should('be.disabled')
  }

  assertSubmitEnabled() {
    this.elements.submitButton().should('not.be.disabled')
  }
}

module.exports = new SignupPage()