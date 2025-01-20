describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName')
      .as('inputFirstName')
      .should('be.visible')
      .type('Henrique')

    cy.get('#lastName')
      .as('inputLastName')
      .should('be.visible')
      .type('Silva')

    cy.get('#email')
      .as('inputEmail')
      .should('be.visible')
      .type('henriqueos.92@outlook.com')
    
    cy.get('#open-text-area')
      .as('openTextArea')
      .should('be.visible')
      .type(longText, { delay: 0 })

   /* cy.get('button[type="submit"]')
      .as('submitButton')
      .should('be.visible')
      .click()*/
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')    
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('henrique@outlook,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('validar campo telefone informando valor não-númerico, o campo deve permanecer limpo', () => {
    cy.get('#phone')
      .as('phone')
      .type('abc')

    cy.get('@phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('henrique@outlook.com')
    cy.get('#phone').as('phone').type('abc')
    cy.get('#phone-checkbox').click()

    cy.get('.phone-label-span').should('be.visible')

    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').as('firstName').type('Henrique')
    cy.get('#lastName').as('lastName').type('Silva')
    cy.get('#email').as('email').type('henrique@outlook.com')
    cy.get('#phone').as('phone').type('999999999')

    cy.get('@firstName').should('have.value', 'Henrique')
    cy.get('@lastName').should('have.value', 'Silva')
    cy.get('@email').should('have.value', 'henrique@outlook.com')
    cy.get('@phone').should('have.value', '999999999')
 
    cy.get('@firstName').clear()
    cy.get('@lastName').clear()
    cy.get('@email').clear()
    cy.get('@phone').clear()

    cy.get('@firstName').should('have.value', '')
    cy.get('@lastName').should('have.value', '')
    cy.get('@email').should('have.value', '')
    cy.get('@phone').should('have.value', '') 
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado = v2', () => {
    const data = {
      firstName: 'Dayane',
      lastName: 'Fernandes',
      email: 'dayane@outlook.com',
      openTextArea: 'Teste'
    }
    cy.fillMandatoryFieldsAndSubmit_v2(data)

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado = v3', () => {
    cy.fillMandatoryFieldsAndSubmit_v3()

    cy.get('.success').should('be.visible')
  })
})