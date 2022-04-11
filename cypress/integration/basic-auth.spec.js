describe('Basic авторизация', () => {

    it('открыть сайт', () => {
        cy.visit('https://finance.dev.fabrique.studio/accounts/login/', {
            auth: {
                username: 'fabrique',
                password: 'fabrique'
            }
        });
    });

});
