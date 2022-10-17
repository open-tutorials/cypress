import { addArticle, fillArticle } from "./common";

describe('Articles', () => {

    it('should do publish article', () => {

        cy.visit('https://demo.realworld.io/');
        // see cypress/support/commands.js
        cy.login('test_anton', 'test_anton@gmail.com', 'xyzXYZ123_');
        cy.url().should('match', /\/\#\/$/);

        // see ./common.js
        addArticle();

        // TODO: check author username also

    });

    it('should do delete article', () => {

        const username = 'test_anton';

        cy.visit('https://demo.realworld.io/');
        // see cypress/support/commands.js
        cy.login(username, 'test_anton@gmail.com', 'xyzXYZ123_');
        cy.url().should('match', /\/\#\/$/);

        // save added article title
        const title = addArticle();

        cy.get('.navbar a').contains(username).click();
        cy.url().should('include', username);

        // my articles should be active
        cy.get('.articles-toggle > ul > li:first-child a')
            .should('have.class', 'active');

        cy.get('article-list').should('be.visible');

        // go to added article
        cy.get('article-list > article-preview').contains(title)
            .parents('article-preview')
            .find('a.preview-link').click();

        // TODO: should be `.article-actions button[data-cy=delete]`
        cy.get('.article-actions span:not(.ng-hide) button').click();

        // we redirected to / ?
        cy.url().should('match', /\/\#\/$/);

        cy.get('.navbar a').contains(username).click();
        cy.url().should('include', username);

        // check my articles toggle active
        cy.get('.articles-toggle > ul > li:first-child a')
            .should('have.class', 'active');

        cy.get('article-list').should('be.visible');

        // wait articles are loaded
        cy.get('article-list > article-preview')
            .should('have.length.greaterThan', 0);

        // check article deleted
        cy.get('article-list > article-preview').contains(title)
            .should('have.length', 0);
    });


    it.only('should do edit article', () => {

        const username = 'test_anton';

        cy.visit('https://demo.realworld.io/');
        // see cypress/support/commands.js
        cy.login('test_anton', 'test_anton@gmail.com', 'xyzXYZ123_');
        cy.url().should('match', /\/\#\/$/);

        // save added article title
        const title = addArticle();

        cy.get('.navbar a').contains(username).click();
        cy.url().should('include', username);

        // my articles should be active
        cy.get('.articles-toggle > ul > li:first-child a')
            .should('have.class', 'active');

        cy.get('article-list').should('be.visible');

        // go to added article
        cy.get('article-list > article-preview').contains(title)
            .parents('article-preview')
            .find('a.preview-link').click();

        // TODO: should be `.article-actions a[data-cy=edit]`
        cy.get('.article-actions a[href*="#/editor"]').click();

        cy.get('.editor-page form').should('be.visible');

        const newTitle = 'Edited article from ' + new Date().toUTCString();
        cy.log(newTitle);
        // we are using https://loremipsum.io/
        const newDescription = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        const newBody = `I like fruits!
It is **tasty** and *healthy.*

My favorite are:
* banana
* apple
* lemon`;
        const newTags = 'fruits, favorite'
        fillArticle(newTitle, newDescription, newBody, newTags);

        // TODO: should be button[type=submit]
        cy.get('.editor-page form button[type=button]').click();

        cy.get('.article-page h1').should('contains.text', newTitle);

        // check Markdown is rendered to HTML
        cy.get('.article-page .article-content').invoke('html')
            .should('contains', '<strong>tasty</strong>')
            .should('contains', '<em>healthy.</em>')
            .should('contains', '<li>apple</li>');

    });

});
