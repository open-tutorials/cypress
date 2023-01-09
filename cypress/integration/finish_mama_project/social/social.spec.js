///<reference types='cypress' />
import { getRandomNumber } from '/cypress/support/utils.js';
import { login } from '/cypress/support/shared.js';

function selectFirstArticle() {
  waitForLoadArticleList();
  cy.get('@articleList')
    .find('article-preview')
    .should('have.length', 10)
    .eq(0)
    .as('randomArticle');
}
function waitForLoadArticleList() {
  cy.get('@articleList')
    .find('article-preview')
    .should('not.contain', 'Loading');
}

function openGlobalFeed() {
  cy.get('.feed-toggle a.nav-link[ng-class*=all]').click();
}

function checkActiveYourFeed() {
  cy.get('.feed-toggle a.nav-link.active[ng-class*=feed]').should('be.exist');
}

describe('Social', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.navbar').should('be.visible').as('appHeader');
    login();
    cy.get('article-list').as('articleList');
    cy.location('hash').should('eq', '#/');
  });

  it('should do subscribe to user', () => {

    checkActiveYourFeed();
    
    openGlobalFeed();

    selectFirstArticle();
    
    cy.get('@randomArticle').find('.author').as('describedAuthor').click();
    cy.get('@describedAuthor')
      .invoke('text')
      .invoke('trim')
      .as('subscribedAuthorName');

    cy.get('@subscribedAuthorName').then((element) => {
      cy.log(element);
      console.log(element);

      cy.get('follow-btn button')
        .should('contain', 'Follow')
        .click()
        .as('followButton');
      // TODO:  improve css
      cy.get('@followButton').should('contain', 'Unfollow');

      cy.get('@appHeader')
        .find('[show-authed=true] [ui-sref="app.home"]')
        .click();

      cy.get('.home-page').should('contain', element);

    });
  });
});
