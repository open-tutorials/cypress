///<reference types="cypress" />

it('should do subscribe to news letter', () => {

    cy.visit('https://www.cypress.io/');
    cy.get('.footer-form > .border').click();
    cy.get('#subscribe-email').type('test@test.ru');
    cy.get('.flex > .block').click();
    cy.get('.border-t > .border').click();
    cy.get('.leading-36px').should('have.text', 'Thank you for subscribing!');

});
