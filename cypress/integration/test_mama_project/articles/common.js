export function fillArticle(title, description, body, tags) {
    cy.get('.editor-page form input[ng-model$=title]').clear().type(title);
    cy.get('.editor-page form input[ng-model$=description]').clear().type(description);
    cy.get('.editor-page form textarea[ng-model$=body]').clear().type(body);
    cy.get('.editor-page form input[ng-model$=tagField]').clear().type(tags);
}


export function addArticle() {
    cy.get('.navbar a[href$="/editor/"]').click();
    cy.url().should('include', '/#/editor/');

    cy.get('.editor-page form').should('be.visible');
    // generate unique title every time
    const title = 'New article from ' + new Date().toUTCString();
    cy.log(title);
    // we are using https://loremipsum.io/
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const body = `I like fruits!
It is **healthy** and *tasty.*

My favorite are:
* banana
* orange
* lemon`;
    const tags = 'fruits, favorite'
    fillArticle(title, description, body, tags);

    // TODO: should be button[type=submit]
    cy.get('.editor-page form button[type=button]').click();

    cy.get('.article-page h1').should('contains.text', title);

    // check Markdown is rendered to HTML
    cy.get('.article-page .article-content').invoke('html')
        .should('contains', '<strong>healthy</strong>')
        .should('contains', '<em>tasty.</em>')
        .should('contains', '<li>banana</li>');

    return title;
}