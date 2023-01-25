///<reference types="cypress" />
import { getRandomNumber } from '/cypress/support/utils';
import { faker } from '@faker-js/faker';

const BACKEND_BASE_URL = 'https://api.realworld.io/api';
const DEFAULT_BASE_URL = Cypress.config('baseUrl');

before(() => {
    cy.log('set base url to backend');
    Cypress.config('baseUrl', BACKEND_BASE_URL);
});

after(() => {
    cy.log('reset base url');
    Cypress.config('baseUrl', DEFAULT_BASE_URL);
});

describe('API', () => {

    describe('Articles', () => {

        it('should do retrieve articles list', () => {

            cy.request('GET', '/articles')
                .then(({ status, body }) => {
                    debugger;

                    // checking HTTP status
                    expect(status).to.eq(200);

                    // checking base response
                    expect(body).to.have.all.keys('articles', 'articlesCount');

                    // checking random article
                    const rnd = getRandomNumber(0, 9);
                    cy.log(`checking ${rnd} article`);
                    const article = body.articles[rnd];
                    expect(article).to.have.all.keys(
                        'slug',
                        'title',
                        'createdAt',
                        'author',
                        'description',
                        'tagList',
                        'body',
                        'favorited',
                        'favoritesCount',
                        'updatedAt'
                    );
                    expect(article.slug).to.not.be.empty;
                    expect(article.title).to.not.be.empty;
                    expect(article.createdAt).to.not.be.empty;
                    expect(article.author).to.not.be.empty;
                    expect(article.description).to.not.be.empty;
                    expect(article.body).to.not.be.empty;

                    expect(article.favorited).to.be.a('boolean');
                    expect(article.favoritesCount).to.be.a('number');

                    // checking author
                    const { author } = article;
                    expect(author).to.have.all.keys('bio', 'following', 'image', 'username');
                    expect(author.following).to.be.a('boolean');

                    expect(author.username).to.not.be.empty;
                    expect(author.image).to.match(/^https/);
                });

        });

    });

    describe('Signup', () => {


        it('should do register user', () => {

            const username = faker.internet.userName();
            const email = faker.internet.email();
            const password = faker.internet.password();

            const payload = {
                user: { username, email, password }
            };

            cy.request('POST', '/users', payload)
                .then(({ status, body }) => {
                    debugger;
                    expect(status).to.eq(200);
                    expect(body).to.have.key('user');
                    const { user } = body;
                    expect(user).to.have.all.keys('username', 'email', 'bio', 'image', 'token');
                    expect(user.username).to.not.be.empty;
                    expect(user.email).to.not.be.empty;
                    expect(user.image).to.not.be.empty;
                    expect(user.token).to.not.be.empty;
                });

        });

        it('should not do register user with empty data', () => {

            const payload = {
                user: { username: '', email: '', password: '' }
            };

            cy.request({ method: 'POST', url: '/users', body: payload, failOnStatusCode: false })
                .then(({ status, body }) => {
                    expect(status).to.eq(422);
                    expect(body).to.have.key('errors');
                    const { errors } = body;
                    expect(errors).to.have.key('email');
                    const { email } = errors;
                    expect(email).to.have.lengthOf(1);
                    const message = email.join('');
                    expect(message).to.have.eq('can\'t be blank');
                });

        });

    });

    it('should do get logged me user', () => {

        cy.readFile('token.txt')
            .should('not.be.empty')
            .then(token => {
                cy.request({
                    method: 'GET',
                    url: '/user',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }).then(({ status, body }) => {
                    debugger;

                    expect(status).to.eq(200);
                    expect(body).to.have.key('user');
                    const { user } = body;
                    expect(user).to.have.keys('username', 'email', 'bio', 'image', 'token');
                    expect(user.username).to.not.be.empty;
                    expect(user.email).to.not.be.empty;
                    expect(user.image).to.not.be.empty;
                })
            });

    });

});
