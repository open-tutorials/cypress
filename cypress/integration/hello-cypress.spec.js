///<reference types="cypress" />

Cypress.on('uncaught:exception', () => false);

it('should do subscribe to news letter', () => {

    cy.visit('https://www.cypress.io/');
    cy.get('#input-footer-email').type('test@test.ru');
    cy.get('.styled__Submit-sc-10l91w3-12').click();
    cy.get('.Subscribe__Label-sc-1hdnlrs-1')
        .should('have.text', 'Thanks for submitting the form.');

});
