///<reference types="cypress" />
import meUser from '/cypress/fixtures/me-user.json';

before(() => {
    const { email, password } = meUser;
    cy.request('POST', 'https://api.realworld.io/api/users/login',
        { user: { email, password } })
        .then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.have.key('user');
            const { user } = body;
            cy.wrap(user.token).as('token');
        });
});

function setJwtToken(window, token) {
    window.localStorage.setItem('jwtToken', token);
}

it('should do API login', () => {
    const { username } = meUser;

    cy.get('@token')
        .should('not.be.empty')
        .then(token => {
            cy.visit('/', {
                onBeforeLoad: (window) => setJwtToken(window, token)
            });
        });

        cy.visit('/');

    cy.location('hash').should('eq', '#/');
    cy.get('.navbar').should('be.visible')
        .should('contain.text', username);

});