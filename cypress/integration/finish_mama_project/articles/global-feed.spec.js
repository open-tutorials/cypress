///<reference types="cypress" />

import { login } from '/cypress/support/shared';
import { getRandomNumber } from '/cypress/support/utils';

function waitForArticlesList() {

    cy.get('@articlesList').contains('.article-preview', 'Loading')
        .should('not.be.visible');

}

function selectRandomArticle() {

    waitForArticlesList();

    const rand = getRandomNumber(0, 9);
    cy.get('@articlesList')
        .find('article-preview')
        .should('have.length', 10)
        .eq(rand)
        .as('randomArticle');

}

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        // TODO: [data-cy=app-header]
        cy.get('.navbar').should('be.visible').as('appHeader');
    });

    describe('Global articles feed', () => {

        beforeEach(() => {
            cy.get('article-list').as('articlesList');
        });

        it('should do display article list', () => {

            cy.get('@articlesList').find('article-preview')
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

            cy.get('.feed-toggle ul > li:nth-child(2) a')
                .click()
                .should('have.class', 'active');

            selectRandomArticle();

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

            // TODO: [data-cy=feed-menu] a[data-cy=global]
            cy.get('.feed-toggle ul > li:nth-child(2) a')
                .click()
                .should('have.class', 'active');

            selectRandomArticle();

            cy.get('@randomArticle')
                .find('favorite-btn button')
                .as('likeButton');

            cy.get('@likeButton')
                .invoke('text')
                .invoke('trim')
                .then(likes => parseInt(likes))
                .as('likesBefore');

            cy.get('@likeButton')
                .invoke('hasClass', 'btn-primary')
                .then(likedBefore => {
                    console.log('liked before', likedBefore);
                    cy.get('@likeButton')
                        .click()
                        .should('not.have.class', 'disabled');

                    cy.get('@likesBefore').then(likesBefore => {
                        const expectingLikes = likesBefore + (likedBefore ? -1 : 1);
                        cy.get('@likeButton')
                            .invoke('text')
                            .invoke('trim')
                            .then(likes => parseInt(likes))
                            .should('eq', expectingLikes);
                    });
                });

        });

        it('should do navigate in list by paging', () => {

            cy.get('list-pagination li')
                .should('have.length.greaterThan', 10)
                .as('availablePages')
                .eq(0)
                .should('have.class', 'active');

            selectRandomArticle();

            cy.get('@randomArticle').find('h1')
                .invoke('text')
                .invoke('trim')
                .as('randomArticleTitle');

            const rand = getRandomNumber(1, 9);

            cy.get('@availablePages')
                .eq(rand)
                .find('a')
                .click();

            waitForArticlesList();

            // is 1st page active
            cy.get('@availablePages')
                .eq(rand)
                .should('have.class', 'active');

            cy.get('@randomArticleTitle').then(title => {
                cy.get('article-list')
                    .should('not.contains.text', title);
            });

            cy.get('@availablePages')
                .eq(0)
                .find('a')
                .click();

            // is 1st page active
            cy.get('@availablePages')
                .eq(0)
                .should('have.class', 'active');

            waitForArticlesList();

            cy.get('@randomArticleTitle').then(title => {
                cy.get('@articlesList')
                    .should('contains.text', title);
            });

        });

        it('should do filter articles by tag', () => {

            // we need waiting for initial loading
            waitForArticlesList();

            cy.get('.sidebar .tag-list .tag-default')
                .as('availableTags')
                .should('have.length.greaterThan', 5);

            const rand = getRandomNumber(0, 5);

            cy.get('@availableTags')
                .eq(rand)
                .click()
                .invoke('text')
                .invoke('trim')
                .as('randomTagName');

            waitForArticlesList();

            cy.get('@randomTagName').then(tagName => {
                // TODO: [data-cy=feed-menu] a[data-cy=filter-by-tag]
                cy.get('.feed-toggle li:nth-child(3) a')
                    .should('contains.text', tagName)
                    .should('have.class', 'active');

                cy.get('@articlesList')
                    .find('article-preview')
                    .should('have.length.greaterThan', 0)
                    .each(article => {
                        cy.wrap(article)
                            .contains('.tag-list .tag-default', tagName)
                            .should('have.length', 1);
                    });
            });

        });

    });

});
