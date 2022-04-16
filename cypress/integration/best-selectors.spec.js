describe('Регистрация', () => {

    it('зарегистрироваться', () => {
        cy.visit('http://localhost:3000/apps/registration.html');
        cy.get('form.registration [name=first_name]').type('Иван');
        cy.get('form.registration [name=last_name]').type('Иванов');
        cy.get('form.registration [name=email]').type('test@test.com');
        cy.get('form.registration [name=password]').type('qwerty');
        cy.get('form.registration [type=submit]').click();
    });

});

describe('Вход', () => {

    it('войти по email', () => {
        cy.visit('http://localhost:3000/apps/registration.html');
        //cy.visit('http://localhost:3000/apps/registration.html?lang=en');
        cy.get('form.login [name=email]').type('test@test.com');
        cy.get('form.login [name=password]').type('qwerty');
        cy.get('form.login [type=submit]').click();
        //cy.contains('Войти').click();
    });

});