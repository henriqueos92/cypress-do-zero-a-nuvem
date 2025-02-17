Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').as('firstName').type('Henrique')
    cy.get('#lastName').as('lastName').type('Silva')
    cy.get('#email').as('email').type('henriqueos.92@outlook.com')
    cy.get('#open-text-area').as('openTextArea').type('Teste')
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit_v2', data => {
    cy.get('#firstName').as('firstName').type(data.firstName)
    cy.get('#lastName').as('lastName').type(data.lastName)
    cy.get('#email').as('email').type(data.email)
    cy.get('#open-text-area').as('openTextArea').type(data.openTextArea)
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit_v3', (data = {
    firstName: 'Jhonn',
    lastName: 'Doe',
    email: 'jhonndoe@outlook.com',
    openTextArea: 'Testando'
} ) => {
    cy.get('#firstName').as('firstName').type(data.firstName)
    cy.get('#lastName').as('lastName').type(data.lastName)
    cy.get('#email').as('email').type(data.email)
    cy.get('#open-text-area').as('openTextArea').type(data.openTextArea)
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then((win) => {
    const script = win.document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.1.4/axe.min.js';
    script.onload = () => {
      win.axe = window.axe;
    };
    win.document.head.appendChild(script);
  });
});