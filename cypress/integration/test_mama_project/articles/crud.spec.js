function addArticle() {
    cy.get('.navbar a[href$="/editor/"]').click();
    cy.url().should('include', '/#/editor/');

    cy.get('.editor-page form').should('be.visible');
    // generate unique title every time
    const title = 'Nice article from ' + new Date().toUTCString();
    cy.log(title);
    cy.get('.editor-page form input[ng-model$=title]').type(title);

    // we are using https://loremipsum.io/
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    cy.get('.editor-page form input[ng-model$=description]').type(description);

    const body = `I like fruits!
It is **healthy!** It is *tasty.*

My favorite are:
* banana
* orange
* lemon`;
    cy.get('.editor-page form textarea[ng-model$=body]').type(body);

    const tags = 'fruits, favorite'
    cy.get('.editor-page form input[ng-model$=tagField]').type(tags);

    // TODO: should be button[type=submit]
    cy.get('.editor-page form button[type=button]').click();

    cy.get('.article-page h1').should('contains.text', title);

    return title;
}

describe('Articles', () => {

    it('should do publish article', () => {

        cy.visit('https://demo.realworld.io/');
        // see cypress/support/commands.js
        cy.login('test_anton', 'test_anton@gmail.com', 'xyzXYZ123_');
        cy.url().should('match', /\/\#\/$/);

        addArticle();

        // check Markdown is rendered to HTML
        cy.get('.article-page .article-content').invoke('html')
            .should('contains', '<strong>healthy!</strong>')
            .should('contains', '<em>tasty.</em>')
            .should('contains', '<li>banana</li>');

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

});
