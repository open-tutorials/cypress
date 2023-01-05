///<reference types="cypress" />
import meUser from '/cypress/fixtures/me-user.json';

it('should do API login', () => {

    const { email, password, username } = meUser;
    cy.request('POST', 'https://api.realworld.io/api/users/login',
        { user: { email, password } })
        .then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.have.all.keys('user');
            const { user } = body;
            cy.wrap(user.token).as('token');
        });

    cy.get('@token')
        .should('not.be.empty')
        .then(token => {
            cy.visit('/', {
                onBeforeLoad: (window) => {
                    window.localStorage.setItem('jwtToken', token);
                }
            });
        });

    cy.location('hash').should('eq', '#/');
    cy.get('.navbar').should('be.visible')
        .should('contain.text', username);

});