describe('Google', () => {

    before(() => {
        cy.visit('https://google.ru/');
    });

    it('Принять cookie', () => {
        cy.get('#L2AGLb > .QS5gu').click();
    });

    it('Ввести запрос', () => {
        cy.get('.gLFyf').type('Привет google{enter}');
    });

    it('Ассистент найден', () => {
        cy.contains('Google Ассистент').should('be.visible');
    });

});
