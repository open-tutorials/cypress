///<reference types="cypress" />
import { getRandomNumber } from "/cypress/support/utils.js";
import { login } from "/cypress/support/shared.js";

function selectRandomArticle() {
  waitForLoadArticleList();
  const random_article_title = getRandomNumber(0, 9);
  cy.get("@articleList")
    .find("article-preview")
    .should("have.length", 10)
    .eq(random_article_title)
    .as("randomArticle");
}
function waitForLoadArticleList() {
  cy.get("@articleList")
    .find("article-preview")
    .should("not.contain", "Loading");
}

function openGlobalFeed() {
  cy.get(".feed-toggle a.nav-link[ng-class*=all]").click();
}

describe("Social", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".navbar").should("be.visible").as("appHeader");
    login();
    cy.get("article-list").as("articleList");
    cy.location("hash").should("eq", "#/");
  });

  it("should do subscribe to user", () => {
    openGlobalFeed();
    selectRandomArticle();
    cy.get("@randomArticle").find(".author").as("describedAuthor").click();
    cy.get("@describedAuthor")
      .invoke("text")
      .invoke("trim")
      .as("describedNameAuthor");

    cy.get("@describedNameAuthor").then((element) => {
      cy.log(element);
      console.log(element);

      cy.get("follow-btn button")
        .should("contain", "Follow")
        .click()
        .as("followButton");
      cy.get("@followButton").should("contain", "Unfollow");

      cy.get("@appHeader")
        .find("[show-authed=true] [ui-sref='app.home']")
        .click();

      cy.get(".home-page").should("contain", element);
    });
  });
});
