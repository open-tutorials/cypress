import { login } from '/cypress/support/shared';
import { getRandomNumber } from '/cypress/support/utils';

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('appHeader');
    });

    describe('Global articles feed', () => {

        it('should do display article list', () => {

            cy.get('article-list article-preview')
                .should('have.length', 10)
                .each(article => {
                    // TODO: read about within
                    cy.wrap(article).within(() => {
                        cy.get('article-meta').within(() => {
                            cy.get('.date').should('be.visible');
                            cy.get('a[ui-sref*=profile] img').should('be.visible');
                            cy.get('.author').should('be.visible');
                            cy.get('favorite-btn')
                                .invoke('text')
                                // TODO: learn jquery trim
                                .invoke('trim')
                                // TODO: learn more about regular expressions
                                .should('match', /^[0-9]+$/)
                        });
                        cy.get('h1').should('be.visible')
                        cy.get('[ng-bind*=description]').should('be.visible');
                        cy.get('.tag-list li').should('have.length.greaterThan', 0);
                    });
                });
        });

        it('should do open article detail page', () => {

            const rand = getRandomNumber(0, 9);
            cy.get('article-list article-preview')
                .should('have.length', 10)
                .eq(rand)
                .as('randomArticle');

            cy.get('@randomArticle').find('h1')
                .invoke('text')
                .invoke('trim')
                .as('randomArticleTitle');

            cy.get('@randomArticle')
                .find('a.preview-link')
                .click();

            cy.location('hash').should('contain', '#/article/');

            cy.get('@randomArticleTitle').then(title => {
                cy.get('.article-page h1')
                    .invoke('text')
                    .invoke('trim')
                    .should('eq', title);
            });

        });

        it('should do like article', () => {

            login();

            cy.location('hash').should('eq', '#/');

            cy.get('.feed-toggle ul > li:nth-child(2) a')
                .click()
                .should('have.class', 'active');

            const rand = getRandomNumber(0, 9);
            cy.get('article-list article-preview')
                .should('have.length', 10)
                .eq(rand)
                .as('randomArticle');

            cy.get('@randomArticle')
                .find('favorite-btn button')
                .as('likeButton');

            cy.get('@likeButton')
                .invoke('text')
                .invoke('trim')
                .as('likesBefore');

            cy.get('@likeButton')
                .invoke('hasClass', 'btn-primary')
                .then(likedBefore => {
                    console.log('liked before', likedBefore);
                    cy.get('@likeButton')
                        .click()
                        .should('not.have.class', 'disabled');

                    cy.get('@likesBefore').then(likesBefore => {
                        const expectingLikes = parseInt(likesBefore) + (likedBefore ? -1 : 1);
                        cy.get('@likeButton')
                            .invoke('text')
                            .invoke('trim')
                            .should('eq', expectingLikes.toString());
                    });
                });

        });

    });

});
