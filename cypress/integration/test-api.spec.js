import { getRandomNumber } from '/cypress/support/utils';

///<reference types="cypress" />

const BACKEND_BASE_URL = 'https://api.realworld.io/';
const DEFAULT_BASE_URL = Cypress.config('baseUrl');

before(() => {
    cy.log('set base url for backend');
    Cypress.config('baseUrl', BACKEND_BASE_URL);
});

after(() => {
    cy.log('reset base url');
    Cypress.config('baseUrl', DEFAULT_BASE_URL);
});

describe('API', () => {

    describe('Articles', () => {

        it('should do retrieve articles list', () => {

            cy.request('GET', '/api/articles')
                .then(({ status, body }) => {
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

                    debugger;
                });

        });

    });

});
