
///<reference types="cypress" />

it('should do register user', () => {
    cy.visit('http://localhost:3000/apps/tesla.html');
    cy.get('form.registration [name=first_name]').type('Иван');
    cy.get('form.registration [name=last_name]').type('Иванов');
    cy.get('form.registration [name=email]').type('test@test.com');
    cy.get('form.registration [name=password]').type('qwerty');
    cy.get('form.registration [type=submit]').click();

    cy.get('.main .success').should('have.text', 'Вы зарегистрированы');
});

it('should do login user', () => {
    cy.visit('http://localhost:3000/apps/tesla.html');
    //cy.visit('http://localhost:3000/apps/tesla.html?lang=en');
    cy.get('form.login [name=email]').type('test@test.com');
    cy.get('form.login [name=password]').type('qwerty');
    cy.get('form.login [type=submit]').click();
    //cy.contains('Войти').click();

    cy.get('.main .success').should('have.text', 'Вы вошли');
});

it('should do check copyrights', () => {
    // cy.contains('Все права защищены').should('be.visible');
    cy.get('body > div > footer p').should('have.text', 'Все права защищены');
    //cy.get('[data-cy=copyrights]').should('have.text', 'Все права защищены');
});