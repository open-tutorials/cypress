describe('Basic авторизация', () => {
    it('открыть сайт', () => {
        cy.visit('http://httpbin.org/basic-auth/foo/bar', {
            auth: {
              username: 'foo',
              password: 'bar'
            }
          });
    });
});
