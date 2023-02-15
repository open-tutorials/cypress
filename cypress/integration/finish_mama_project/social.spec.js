///<reference types='cypress' / >
import { getRandomNumber } from '../../support/utils';
import { login } from '../../support/shared';
import meUser from '../../fixtures/me-user.json';
import { setJwtToken } from '../../support/utils';

function selectFirstArticle() {
    waitForArticlesList();
    cy.get('@articleList')
        .find('.article-preview')
        // .should('have.length', 12)
        .should('have.length.greaterThan', 2)
        .eq(0)
        .as('firstArticle');
}
function waitForArticlesList() {
    cy.get('@articleList')
        .contains('.article-preview', 'Loading')
        .should('not.be.visible');
}

function openGlobalFeed() {
    cy.get('.feed-toggle a.nav-link[ng-class*=all]').click();
}

function checkActiveYourFeed() {
    cy.get('@yourFeed').should('have.class', 'active');
}

function subscribeFromUser() {
    // meUser.username
    cy.get('@firstArticle').find('.author').as('describedAuthor').click();
    cy.get('@describedAuthor')
        .invoke('text')
        .invoke('trim')
        .as('subscribedAuthorName');
    cy.get('follow-btn button')
        .should('contain', 'Follow')
        .click()
        .as('followButton');
    // TODO:  improve selector
    cy.get('@followButton').should('contain', 'Unfollow');
}

function unsubscribeFromUser() {
    checkActiveYourFeed();
    selectFirstArticle();
    cy.get('@firstArticle').find('.author').as('undescribedAuthor').click();
    cy.get('@undescribedAuthor')
        .invoke('text')
        .invoke('trim')
        .as('unsubscribedAuthorName');
    cy.get('follow-btn button')
        .should('contain', 'Unfollow')
        .click()
        .as('UnfollowButton');
    // TODO:  improve selector
    cy.get('@UnfollowButton').should('contain', 'Follow');

}

function unsubscribeFromAll() {
    cy.get('@buttonHome').click();
    waitForArticlesList();
    cy.get('@articleList').find('.article-preview')
        .then(articles => {
            cy.log(articles.length);
            if (articles.length > 2) {
                cy.wrap(articles).eq(0).click();
                unsubscribeFromUser();
                unsubscribeFromAll();
            }
        });
}

function goToHomePage() {
    cy.get('@appHeader')
        .find('[show-authed=true] [ui-sref="app.home"]').as('buttonHome')
        .click();
}

function deleteAllMyArticles() {
    cy.get('@appHeader').find('[ui-sref*=username]').click();
    debugger;
    cy.wait(5000);
    // waitForArticlesList();

    cy.get('.articles-toggle .nav-link[ui-sref*=main]').should('have.class', 'active');
    cy.get('@articleList').find('.article-preview')
        .then(articles => {
            cy.log(articles.length);
            if (articles.length > 2) {
                deleteMyArticle();
                deleteAllMyArticles();
            }
        });
}

function deleteMyArticle() {

    cy.get('@articleList').find('.article-preview').eq(0).click();
    cy.get('.article-actions button[ng-click*=delete]').click();
    checkActiveYourFeed();
}

describe('Social', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').should('be.visible').as('appHeader');

        // cy.get('@token')
        cy.readFile('token.txt')
            .should('not.be.empty')
            .then(token => {
                cy.visit('/', {
                    onBeforeLoad: (window) => setJwtToken(window, token)
                });
            });

        cy.get('.navbar').should('be.visible')
            .should('contain.text', meUser.username);

        cy.get('article-list').as('articleList');
        cy.get('@appHeader').find('[show-authed=true] [ui-sref="app.home"]').as('buttonHome');
        cy.get('.feed-toggle a.nav-link[ng-class*=feed]').as('yourFeed');
        cy.location('hash').should('eq', '#/');
    });

    it('should do subscribe to user', () => {

        deleteAllMyArticles();
        unsubscribeFromAll();
        openGlobalFeed();
        selectFirstArticle();
        subscribeFromUser();

        cy.get('@subscribedAuthorName').then((authorName) => {
            cy.log(authorName);
            console.log(authorName);

            goToHomePage();

            cy.get('.home-page').should('contain', authorName);
        });

    });

    it('should do unsubscribe from user', () => {

        deleteAllMyArticles();

        cy.get('@buttonHome').click();

        checkActiveYourFeed();
        waitForArticlesList();

        cy.get('@articleList').find('.article-preview')
            .then(articles => {
                cy.log(articles.length);
                if (articles.length === 2) {

                    openGlobalFeed();
                    selectFirstArticle();
                    subscribeFromUser();

                    cy.get('@subscribedAuthorName').then((authorName) => {
                        cy.log(authorName);
                        console.log(authorName);

                        goToHomePage();

                        cy.get('.home-page').should('contain', authorName);
                    });
                }
            });

        unsubscribeFromUser();

        cy.get('@unsubscribedAuthorName').then((authorName) => {
            cy.log(authorName);
            console.log(authorName);

            goToHomePage();
            cy.get('.home-page').should('not.contain', authorName);
        });
    });
});