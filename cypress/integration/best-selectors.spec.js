///<reference types="cypress" />

it('should do register user', () => {
    cy.visit('http://localhost:3000/apps/tesla.html');
    cy.get('form.registration input[name=first_name]').type('Иван');
    cy.get('form.registration input[name=last_name]').type('Иванов');
    cy.get('form.registration input[name=email]').type('test@test.com');
    cy.get('form.registration input[name=password]').type('qwerty');
    cy.get('form.registration button[type=submit]').click();

    cy.get('.main .success').should('have.text', 'Вы зарегистрированы');
});

it('should do login user', () => {
    cy.visit('http://localhost:3000/apps/tesla.html');
    //cy.visit('http://localhost:3000/apps/tesla.html?lang=en');
    cy.get('form.login input[name=email]').type('test@test.com');
    cy.get('form.login input[name=password]').type('qwerty');
    cy.get('form.login button[type=submit]').click();
    //cy.contains('Войти').click();

    cy.get('.main .success').should('have.text', 'Вы вошли');
});

it('should do check copyrights', () => {
    // cy.contains('Все права защищены').should('be.visible');
    cy.get('body > div > footer p').should('have.text', 'Все права защищены');
    //cy.get('[data-cy=copyrights]').should('have.text', 'Все права защищены');
});