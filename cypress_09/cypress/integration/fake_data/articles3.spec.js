///<reference types="cypress" />

import { faker } from '@faker-js/faker';
import { login } from '/cypress/support/shared';
import meUser from '/cypress/fixtures/me-user.json';

function generateFakeArticle() {

    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        tags: [
            faker.word.adjective(),
            faker.word.adjective(),
            faker.word.adjective()
        ]
    };

}

function clearArticle() {

    // fill and submit form
    cy.get('@editArticleForm').find('input[ng-model$=title]').clear();
    cy.get('@editArticleForm').find('input[ng-model$=description]').clear();
    cy.get('@editArticleForm').find('textarea[ng-model$=body]').clear();
    cy.get('@editArticleForm').find('input[ng-model$=tagField]').clear();

    cy.get('.tag-list .tag-default').each((tag) => cy.wrap(tag)
        .find('[ng-click*=remove]').click());

}

function fillArticle() {

    const article = generateFakeArticle();

    // fill and submit form
    cy.get('@editArticleForm').find('input[ng-model$=title]').type(article.title);
    cy.get('@editArticleForm').find('input[ng-model$=description]').type(article.description);

    const body = `I like fruits!
It is **healthy** and *tasty.*

My favorite are:
* banana
* orange
* lemon`;
    cy.get('@editArticleForm').find('textarea[ng-model$=body]').type(body);

    cy.get('@editArticleForm').find('input[ng-model$=tagField]').as('articleTagInput');
    for (const tag of article.tags) {
        cy.get('@articleTagInput').type(tag).type('{enter}');
    }

    return article;
}

function checkArticle(article) {
    
    // check article data
    cy.get('@articlePage').find('h1').should('contains.text', article.title);

    cy.get('@articlePage').find('.tag-list').as('articleTags');
    for (const tag of article.tags) {
        cy.get('@articleTags').should('contain.text', tag);
    }

    // check Markdown is rendered to HTML
    cy.get('@articlePage').find('[ng-bind-html$=body]')
        .should('contain.html', '<strong>healthy</strong>')
        .should('contain.html', '<em>tasty.</em>')
        .should('contain.html', '<li>banana</li>');

    // TODO: check author & date
}

function addArticle() {

    // open editor
    cy.get('@appHeader').find('a[href$="/editor/"]').click();
    cy.url().should('include', '/#/editor/');

    cy.get('.editor-page').as('addArticlePage');
    cy.get('@addArticlePage').find('form').should('be.visible')
        .as('addArticleForm')
        .as('editArticleForm');

    const article = fillArticle();

    // TODO: should be button[type=submit]
    cy.get('@addArticleForm').find('button[type=button]').click();

    // waiting for article page
    cy.get('.article-page').should('be.visible');

    return article;
}

function openMyArticles() {

    cy.get('@appHeader').contains('a', meUser.username).click();
    cy.url().should('include', meUser.username);

    // my articles should be active
    cy.get('.articles-toggle > ul > li:first-child a')
        .should('have.class', 'active');

}

function openMyArticle(article) {

    openMyArticles();

    cy.get('article-list').should('be.visible').as('myArticles');

    // find my article
    cy.get('@myArticles').contains(article.title)
        .parents('article-preview')
        .find('a.preview-link').click();
}

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').should('be.visible').as('appHeader');
        login();
    });

    it('should do publish article', () => {

        const article = addArticle();

        // waiting for article page
        cy.get('.article-page').should('be.visible').as('articlePage');

        checkArticle(article);
    });

    it('should do delete article', () => {

        const article = addArticle();

        openMyArticle(article);

        // TODO: should be `.article-actions button[data-cy=delete]`
        cy.get('.article-actions span:not(.ng-hide) button').click();

        // we redirected to / ?
        cy.url().should('eq', 'https://demo.realworld.io/#/');

        openMyArticles();

        cy.get('article-list').should('be.visible').as('myArticles');

        // waiting articles are loaded
        cy.get('@myArticles').find('article-preview')
            .should('have.length.greaterThan', 0);

        // check article are not presented
        cy.get('@myArticles').contains(article.title)
            .should('have.length', 0);
    });

    it('should do edit article', () => {

        const article = addArticle();

        openMyArticle(article);

        // TODO: should be `.article-actions a[data-cy=edit]`
        cy.get('.article-actions a[href*="#/editor"]').click();

        cy.get('.editor-page').as('editArticlePage');

        cy.get('@editArticlePage').find('form')
            .should('be.visible').as('addArticleForm');

        clearArticle();

        const newArticle = fillArticle();

        // TODO: should be button[type=submit]
        cy.get('@editArticlePage').find('button[type=button]').click();

        // waiting for article page
        cy.get('.article-page').should('be.visible').as('articlePage');

        checkArticle(newArticle);
    });

});
