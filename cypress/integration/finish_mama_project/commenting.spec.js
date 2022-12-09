///<reference types="cypress" />

import { login } from '/cypress/support/shared';
import { getRandomNumber } from '/cypress/support/utils';
import { faker } from '@faker-js/faker';

function waitForArticlesList() {

    cy.get('article-list').as('articlesList')
        .contains('.article-preview', 'Loading')
        .should('not.be.visible');

}

function openGlobalFeed() {

    // TODO: [data-cy=feed-menu] a[data-cy=global]
    cy.get('.feed-toggle ul > li:nth-child(2) a')
        .click()
        .should('have.class', 'active');

}

function openRandomArticle() {

    waitForArticlesList();

    const rand = getRandomNumber(0, 9);
    cy.get('@articlesList')
        .find('article-preview')
        .should('have.length', 10)
        .eq(rand)
        .as('randomArticle')
        .click();

}

function generateFakeComment() {

    return {
        body: faker.lorem.paragraph()
    };

}

function addComment() {

    const comment = generateFakeComment();

    cy.get('@articlePage')
        .find('form.comment-form')
        .as('addCommentForm')
        .should('be.visible');

    cy.get('@addCommentForm').within(() => {
        cy.get('textarea[ng-model$=body]').type(comment.body);
        cy.get('button[type=submit]').click();
    });

    return comment;
}

describe('Commenting', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        // TODO: [data-cy=app-header]
        cy.get('.navbar').should('be.visible').as('appHeader');
        login();
    });

    it('should do add comment', () => {

        openGlobalFeed();
        openRandomArticle();

        cy.get('.article-page').as('articlePage');

        const comment = addComment();

        cy.get('@articlePage')
            .contains('comment', comment.body)
            .should('be.visible');

    });

    it('should do delete comment', () => {

        openGlobalFeed();
        openRandomArticle();

        cy.get('.article-page').as('articlePage');

        const comment = addComment();
        cy.get('@articlePage')
            .contains('comment', comment.body)
            .as('commentForDelete')
            // TODO: .card-footer [data-cy=delete]
            .find('.card-footer > span i')
            .click();

        cy.get('@commentForDelete').should('not.exist');

    });

});
