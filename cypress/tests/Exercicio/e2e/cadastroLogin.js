import userData from '../fixtures/userData.json'
import SignupPage from '../pages/signupPage.js'
import LoginPage from '../pages/loginPage.js'

describe('Cadastro e Login', () => {

  it('Deve registrar um novo usuário com informações válidas', () => {
    SignupPage.visit()
    SignupPage.goToSignup()
    SignupPage.fillForm("Carolina", "Sampaio", "Carolina", "Ca23li70", "Ca23li70")
    SignupPage.submit()
  })

  describe('Login com sucesso', () => {
    before(() => {
      cy.request('POST', 'http://localhost:3001/users', {
        firstName: "Carolina",
        lastName: "Sampaio",
        username: userData.validUser.username,
        password: userData.validUser.password
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })

    it('Deve fazer login com um usuário válido', () => {
      LoginPage.visit()
      LoginPage.login(userData.validUser.username, userData.validUser.password)

      LoginPage.elements.logo().should('be.visible')
      cy.contains(/(Real World App)/i, { timeout: 10000 }).should('be.visible')
    })
  })

  it('Tentar fazer login com credenciais inválidas', () => {
    LoginPage.visit()
    LoginPage.login(userData.invalidUser.username, userData.invalidUser.password)
    LoginPage.elements.errorMessage().should('be.visible')
  })

  it('Deve exibir mensagem de erro ao tentar registrar sem preencher Last Name', () => {
   SignupPage.visit()
   SignupPage.goToSignup()

   SignupPage.fillForm('Sofia', '', 'Sofia', 'zxcv890', 'zxcv890')

    // botão deve ficar desabilitado
   SignupPage.assertSubmitDisabled()

    // valida mensagem (PT ou EN)
   cy.contains(/(Last Name.*obrigatório|Last Name.*required)/i, { timeout: 10000 })
  .should('be.visible')
  })
})
