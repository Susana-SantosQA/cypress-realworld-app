import userData from '../fixtures/userData.json'

describe('Cadastro e Login', () => {

  it('Deve registrar um novo usuário com informações válidas', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[href="/signup"]').click()
    cy.get('[name="firstName"]').type('Carolina')
    cy.get('[name="lastName"]').type('Sampaio')
    cy.get('[name="username"]').type('Carolina')
    cy.get('[name="password"]').type('Ca23li70')
    cy.get('[name="confirmPassword"]').type('Ca23li70')
    cy.get('[data-test="signup-submit"]').click()
    
  })

})

describe('Login com sucesso', () => {

  before(() => {
    // Cria o usuário antes de rodar o teste de login
    cy.request('POST', 'http://localhost:3001/users', {
      firstName: "Carolina",
      lastName: "Sampaio",
      username: userData.validUser.username,
      password: userData.validUser.password
    }).then((response) => {
      expect(response.status).to.eq(201) // valida criação
    })
  })

  it('Deve fazer login com um usuário válido', () => {
    cy.visit('http://localhost:3000/')
    cy.get("#username").type(userData.validUser.username)
    cy.get("#password").type(userData.validUser.password)
    cy.get('[type="submit"]').click()

    // Espera elemento fixo pós-login
    cy.get(".NavBar-logo", { timeout: 15000 }).should('be.visible')

    // Valida o texto pós-login
    cy.contains(/(Real World App)/i, { timeout: 10000 }).should('be.visible')
  })

    //cy.get('[data-test="user-onboarding-next"]').click()
    //cy.get('[placeholder="Bank Name"]').type('Carolina')
    //cy.get('[name="routingNumber"]').type('021000021')
    //cy.get('[name="accountNumber"]').type('5678901234')
    //cy.get('.MuiButton-containedPrimary').click()
    //cy.get('.MuiButton-textPrimary').click()
  })

  it('Tentar fazer login com credenciais inválidas', () => {
    cy.visit('http://localhost:3000/')
    cy.get("#username").type(userData.invalidUser.username)
    cy.get("#password").type(userData.invalidUser.password)
    cy.get('[type="submit"]').click()
    cy.get('[role="alert"]')
  })

  it('Deve exibir mensagem de erro ao tentar registrar sem preencher Last Name', () => { 
  cy.visit('http://localhost:3000/')
  cy.get('[href="/signup"]').click()

  // Preenche apenas os campos obrigatórios, deixando Last Name vazio
  cy.get('[name="firstName"]').type('Sofia')
  cy.get('[name="lastName"]').clear()
  cy.get('[name="username"]').type('Sofia')
  cy.get('[name="password"]').type('zxcv890')
  cy.get('[name="confirmPassword"]').type('zxcv890')

  // Clica no botão mesmo se estiver desabilitado
  cy.get('[data-test="signup-submit"]').click({ force: true })

  // Aguarda até 10 segundos pela mensagem de erro, em PT ou EN
  cy.contains(/(Last Name.*obrigatório|Last Name.*required)/i, { timeout: 10000 })
    .should('be.visible')
})