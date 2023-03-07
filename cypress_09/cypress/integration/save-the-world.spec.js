///<reference types="cypress" />

it('should do save the world', () => {

    cy.visit('http://localhost:3000/apps/pentagon.html');

    const colors = [
        'rgb(255, 0, 0)',
        'rgb(0, 120, 0)',
        'rgb(30, 30, 80)',
        'rgb(0, 255, 120)',
        'rgb(255, 120, 0)',
        'rgb(0, 255, 0)',
        'rgb(0, 0, 255)',
        'rgb(0, 155, 255)',
        'rgb(0, 50, 255)',
        'rgb(0, 0, 0)'
    ];

    for (let i = 0; i < 10; i++) {
        let color = colors[i];
        cy.get('.digit' + i)
            .invoke('css', 'background-color', color)
            .invoke('css', 'background-color')
            .should('eq', color);
    }

    const pin = '05091977';
    for (let i = 0; i < pin.length; i++) {
        cy.get('.digit' + pin[i]).click();
    }

    cy.viewport('iphone-x');

    for (let i = 0; i < 50; i++) {
        const j = 50 - i;
        cy.get('.code' + i).type(j * j);
    }

    cy.get('[data-name=stop] iframe').invoke('css', 'display', 'none');
    cy.get('stop-button').shadow().find('button.stop').click();

});