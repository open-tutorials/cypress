beforeEach(() => {
    cy.visit('http://localhost:3000/app/index.html');
});

it('should do long like', () => {

    cy.get('section[data-cy=like').as('like');
    cy.get('@like').find('button').click();

    cy.get('@like').find('[data-cy=success]', { timeout: 5000 })
        .should('have.text', 'Well done!');
});

it.only('should do rebuild tree', () => {

    cy.get('section[data-cy=tree]').as('tree');
    cy.get('@tree').find('button').click();

    cy.get('@tree').find('[data-cy=daddy]').should('be.visible').as('daddy');
    cy.get('@daddy').invoke('prop', 'outerHTML').then(html => cy.log(html));

    cy.get('@daddy').then(daddy => { 
        cy.wrap(daddy).should('exist');
        // comment this line
        cy.wait(1000);
        cy.wrap(daddy).should('not.exist');
    });

    cy.get('@daddy').find('[data-cy=child]').should('be.visible');

    cy.get('@tree').find('[data-cy=daddy] [data-cy=child]').should('be.visible');
});