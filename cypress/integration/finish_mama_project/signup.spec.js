import { getRandomNumber } from '/cypress/support/utils';
import meUser from '/cypress/fixtures/me-user.json';
import { login } from '/cypress/support/shared.js';

describe('Sign up', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').should('be.visible').as('appHeader');
    });

    it('should do register user', () => {

        cy.get('@appHeader').find('a[href$="/register"]').click();
        cy.url().should('include', '/#/register');

        cy.get('.auth-page').as('registerPage');
        cy.get('@registerPage').find('h1').should('have.text', 'Sign up');
        cy.get('@registerPage').find('form').should('be.visible').as('registerForm');

        const rnd = getRandomNumber(1000, 9999);

        const username = 'user_' + rnd;
        cy.get('@registerForm').find('input[ng-model$=username]').type(username);

        const email = username + '@gmail.com';
        cy.get('@registerForm').find('input[ng-model$=email]').type(email);
        cy.get('@registerForm').find('input[ng-model$=password]').type('xyzXYZ123_');
        cy.get('@registerForm').find('button[type=submit]').click();

        cy.get('@appHeader').should('contain.text', username);

    });

    it('should do login user', () => {

        login();

    });

    it('should do logout user', () => {

        login();

        cy.get('@appHeader').find('a[href$="/settings"]').click();
        cy.url().should('include', '/#/settings');

        cy.get('.settings-page').as('settingsPage');

        cy.get('@settingsPage').find('h1').should('have.text', 'Your Settings');
        // TODO: improve selector to button[data-cy=logout]
        cy.get('@settingsPage').find('button[ng-click*=logout]').click();

        cy.get('@appHeader').should('not.contain.text', meUser.username);
    });

});
