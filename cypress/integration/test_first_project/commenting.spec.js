function openFirstArticle() {
    // we on main page?
    cy.url().should('match', /\/\#\/$/);
    cy.get('.page.container .feed-toggle ul > li:nth-child(2)').click();
    cy.get('article-list').should('be.visible');

    // go to first article
    cy.get('article-list > article-preview:first-child a.preview-link')
        .click();
}

function addComment() {
    // generate unique comment every time
    const comment = 'Nice comment here from ' + new Date().toString();
    cy.log(comment);

    cy.get('form.comment-form textarea[ng-model$=body]')
        .type(comment);

    cy.get('form.comment-form button[type=submit]').click();

    // TODO: should be cy.get('.page [data-cy=comments]')
    return cy.get('.page > div:nth-child(4)').contains(comment);
}

describe('Commenting', () => {

    it('should do add comment', () => {

        cy.visit('https://demo.realworld.io/');
        // see cypress/support/commands.js
        cy.login('test_anton', 'test_anton@gmail.com', 'xyzXYZ123_');

        openFirstArticle();

        const comment = addComment();
        comment.should('be.visible');

    });

    it('should do delete comment', () => {

        cy.visit('https://demo.realworld.io/');
        // see cypress/support/commands.js
        cy.login('test_anton', 'test_anton@gmail.com', 'xyzXYZ123_');

        openFirstArticle();

        const comment = addComment();
        comment.parents('comment')
            // TODO: should be find('[data-cy=delete]')
            .find('.card-footer > span i').click();

    });

});
