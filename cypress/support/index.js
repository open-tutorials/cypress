// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import meUser from '/cypress/fixtures/me-user.json';

before(() => {
    const { email, password } = meUser;
    cy.request('POST', 'https://api.realworld.io/api/users/login',
        { user: { email, password } })
        .then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.have.key('user');
            const { user } = body;
            cy.writeFile('token.txt', user.token);
        });
});
