describe('Регистрация', () => {

    it('открыть форму', () => {
        cy.visit('http://localhost:3000/apps/registration.html');
    });

    it('заполнить форму', () => {
        cy.get('#b1h7e4i8d3')
            .type('Иванов');
    });

});

describe('Вход', () => {

    it('открыть форму', () => {
        cy.visit('http://localhost:3000/apps/registration.html');
    });

    it('заполнить форму', () => {
        cy.get('#b1h7e4i8d3')
            .type('Иванов');
    });

});