///<reference types="cypress" />

describe('Sign up', () => {
    
    it('should register user', () => {
        
        // TODO: your test body

    });

    it.only('should do login user', () => {
        
        // open https://demo.realworld.io/
        cy.visit('https://demo.realworld.io/');

        // click Sign In link in app header
        cy.get('.navbar a[href$="/login"]').click();

        // url should be /#/login
        cy.url().should('include', '/#/login');

        // page heading should be Sign in
        cy.get('.auth-page h1').should('have.text', 'Sign in');

        // page should have form
        cy.get('.auth-page form').should('be.visible');

        // type email form field
        cy.get('.auth-page form input[ng-model$=email]').type('test_anton@gmail.com');

        // type password form field
        cy.get('.auth-page form input[ng-model$=password]').type('xyzXYZ123_');

        // click on sign in button
        cy.get('.auth-page form button[type=submit]').click();

        // header should contains {username}
        cy.get('.navbar').should('contain.text', 'test_anton');
        
    });

});
