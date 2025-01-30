describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

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
    
    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('henrique@outlook,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('validar campo telefone informando valor não-númerico, o campo deve permanecer limpo', () => {
    cy.get('#phone')
      .as('phone')
      .type('abc')

    cy.get('@phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('henrique@outlook.com')
    //cy.get('#phone').as('phone').type('abc')
    cy.get('#phone-checkbox').check()
    cy.get('.phone-label-span').should('be.visible')

    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
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
    cy.clock()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado = v2', () => {
    cy.clock()

    const data = {
      firstName: 'Dayane',
      lastName: 'Fernandes',
      email: 'dayane@outlook.com',
      openTextArea: 'Teste'
    }
    cy.fillMandatoryFieldsAndSubmit_v2(data)

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado = v3', () => {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmit_v3()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    /*cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')*/

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('example')

    cy.get('#file-upload')
      .selectFile('@example')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Teste')
      .should('have.value', 'Teste')
  })

  it('Faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .should(response => {
        expect(response.status).to.eq(200)
        expect(response.statusText).to.eq('OK')
        expect(response.body).to.include('CAC TAT')
      })
  })

  it('encontra o gato escondido', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle') 
      .invoke('text', 'Encontre o gato escondido')
  })
})