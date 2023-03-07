///<reference types="cypress" />

import { login } from '/cypress/support/shared';
import { faker } from '@faker-js/faker';

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

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').should('be.visible').as('appHeader');
        login();
    });

    it('should do publish article', () => {

        // open editor
        cy.get('@appHeader').find('a[href$="/editor/"]').click();
        cy.url().should('include', '/#/editor/');

        cy.get('.editor-page').as('addArticlePage');

        cy.get('@addArticlePage').find('form')
            .should('be.visible').as('addArticleForm');

        const article = generateFakeArticle();

        // fill and submit form
        cy.get('@addArticleForm').find('input[ng-model$=title]').type(article.title);
        cy.get('@addArticleForm').find('input[ng-model$=description]').type(article.description);
        cy.get('@addArticleForm').find('input[ng-model$=tagField]').as('articleTagInput');
        for (const tag of article.tags) {
            cy.get('@articleTagInput').type(tag).type('{enter}');
        }

        const body = `I like fruits!
It is **healthy** and *tasty.*

My favorite are:
* banana
* orange
* lemon`;
        cy.get('@addArticleForm').find('textarea[ng-model$=body]').type(body);

        // TODO: should be button[type=submit]
        cy.get('@addArticleForm').find('button[type=button]').click();

        // check article data
        cy.get('.article-page').as('articlePage');
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

    });

});
