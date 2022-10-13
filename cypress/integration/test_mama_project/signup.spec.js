describe('Sign up', () => {

    it('should do register user', () => {

        cy.visit('https://demo.realworld.io/');

        cy.get('.navbar a[href$="/register"]').click();
        cy.url().should('include', '/#/register');

        cy.get('.auth-page h1').should('have.text', 'Sign up');
        cy.get('.auth-page form').should('be.visible');

        const rnd = Math.round(Math.random() * 8999) + 1000;

        const username = 'user_' + rnd;
        cy.get('.auth-page form input[ng-model$=username]').type(username);

        const email = username + '@gmail.com';
        cy.get('.auth-page form input[ng-model$=email]').type(email);


        cy.get('.auth-page form input[ng-model$=password]').type('xyzXYZ123_');
        cy.get('.auth-page form button[type=submit]').click();

        cy.get('.navbar').should('contain.text', username);

    });

    it('should do login user', () => {

        cy.visit('https://demo.realworld.io/');

        cy.get('.navbar a[href$="/login"]').click();
        cy.url().should('include', '/#/login');

        cy.get('.auth-page h1').should('have.text', 'Sign in');
        cy.get('.auth-page form').should('be.visible');

        cy.get('.auth-page form input[ng-model$=email]')
            .type('test_anton@gmail.com');
        cy.get('.auth-page form input[ng-model$=password]')
            .type('xyzXYZ123_');
        cy.get('.auth-page form button[type=submit]').click();

        cy.get('.navbar').should('contain.text', 'test_anton');

    });

    it('should do logout user', () => {

        const username = 'test_anton';

        cy.visit('https://demo.realworld.io/');
        // see file cypress/support/commands.js
        cy.login(username, 'test_anton@gmail.com', 'xyzXYZ123_');

        cy.get('.navbar a[href$="/settings"]').click();
        cy.get('.settings-page h1').should('have.text', 'Your Settings');
        // TODO: improve selector to button[data-cy=logout]
        cy.get('.settings-page button[ng-click*=logout]').click();

        cy.url().should('match', /\/\#\/$/);
        cy.get('.navbar').should('not.contain.text', username);
    });

});
