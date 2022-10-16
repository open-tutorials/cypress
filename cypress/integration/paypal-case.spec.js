it('should pay by Pay Pal', () => {
    const paypal = {
        email: '',
        password: ''
    };

    cy.visit('https://www.sunday.de/');
    cy.get('.cs-languages__fixed-modal ul > li:last-child').click();
    cy.get('.hp-product__section [data-slick-index=0] .hp-product__item-image-wrapper a').click();
    cy.get('.cs-addtocart__wrapper button.cs-addtocart__button').eq(0).click();
    cy.get('#btn-minicart-close-to-checkout').click();
    const rnd = Math.round(Math.random() * 8999) + 1000;
    const email = 'user_' + rnd + '@test.com'
    cy.get('form.step-zero input[name=email]').type(email + '{enter}');
    cy.window().then((win) => {
        cy.stub(win, 'open', url => {
            win.location.href = 'https://the-internet.herokuapp.com/';
        }).as('popup');
    });

    // TODO: find better solution
    cy.wait(5000);

    cy.get('iframe[title=PayPal]')
        .its('0.contentWindow')
        .should('exist')
        .then(iframe => {
            cy.stub(iframe, 'open').as('open')
                .callsFake(url => {
                    cy.log(url);
                    //cy.visit(url);
                });
        });

    cy.get('iframe[title="PayPal"]')
        .its('0.contentDocument')
        .should('exist')
        .its('body').should('not.be.empty')
        .then(cy.wrap)
        .as('paypal_button_iframe');


    cy.get('@paypal_button_iframe')
        .find('.paypal-button').click();

    cy.get('iframe[title="PayPal Checkout Overlay"]')
        .its('0.contentDocument')
        .should('exist')
        .its('body').should('not.be.empty')
        .then(cy.wrap)
        .as('paypal_overlay_iframe');


    // TODO: find better solution
    cy.wait(5000);

    cy.get('@paypal_overlay_iframe')
        .find('iframe[title="ppcheckout"]')
        .its('0.contentDocument')
        .should('exist')
        .its('body').should('not.be.empty')
        .then(cy.wrap)
        .as('paypal_checkout_iframe');

    cy.get('@paypal_checkout_iframe')
        .find('form[name=login] input[name=login_email]')
        .clear()
        .type(paypal.email);

    cy.get('@paypal_checkout_iframe')
        .find('form[name=login] input[name=login_password]')
        .clear()
        .type(paypal.password);

    cy.get('@paypal_checkout_iframe')
        .find('form[name=login] button[type=submit]')
        .click();
});