///<reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:3000/apps/fun-cases.html');
});

it('should do check QR code', () => {

    cy.get('section[data-cy=qr-code]').should('be.visible').as('section').scrollIntoView();

    cy.get('@section').find('img').then(image => {
        const url = image.attr('src');
        cy.task('readQRCode', url).should('eq', 'https://demo.realworld.io/');
    });

});

it.only('should do book delivery', () => {
    
    cy.get('section[data-cy=slow-ui]').should('be.visible').as('section');

    cy.get('@section')
        .find('button[data-cy=start-booking]')
        .click();

    cy.get('@section')
        .find('form[name=booking]')
        .should('be.visible').as('bookingForm');

    const today = new Date();
    const afterTomorrow = new Date();
    afterTomorrow.setDate(today.getDate() + 2);

    const targetDate = afterTomorrow.toLocaleDateString('en-US');

    cy.get('@bookingForm').should('not.have.class', 'busy');

    cy.get('@bookingForm')
        .find('input[name=target_date]')
        .clear()
        .type(targetDate);

    cy.get('@bookingForm')
        .find('button[data-cy=submit]')
        .click();

    cy.get('@bookingForm')
        .find('p.success')
        .should('be.visible')
        .should('contain.text', targetDate);
});
