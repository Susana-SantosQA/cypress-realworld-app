describe('Login com sucesso', () => {
  it('Deve fazer login com um usuário válido', () => {
    cy.visit('http://localhost:3000/')
    cy.get("#username").type('Carolina')
    cy.get("#password").type('Ca23li70')
    cy.get('[type="submit"]').click()
    cy.get('[data-test="user-onboarding-dialog-title"]')
  })

  it('Tentar fazer login com credenciais inválidas', () => {
    cy.visit('http://localhost:3000/')
    cy.get("#username").type('Ivanteste')
    cy.get("#password").type('teste890')
    cy.get('[type="submit"]').click()
    cy.get('[role="alert"]')
  })

})