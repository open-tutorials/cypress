Cypress.Commands.add('login', (username, email, password) => {

    cy.get('.navbar a[href$="/login"]').click();
    cy.url().should('include', '/#/login');
    cy.get('.auth-page h1').should('have.text', 'Sign in');
    cy.get('.auth-page form').should('be.visible');
    cy.get('.auth-page form input[ng-model$=email]')
        .type(email);
    cy.get('.auth-page form input[ng-model$=password]')
        .type(password);
    cy.get('.auth-page form button[type=submit]').click();
    cy.get('.navbar').should('contain.text', username);

});
