///<reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:3000/apps/deep-cypress.html');
});

it('should do long like', () => {

    cy.get('section[data-cy=long-like]').as('section');
    cy.get('@section').find('button').click();

    cy.get('@section').find('[data-cy=success]', { timeout: 5000 })
        .should('have.text', 'Well done!');
});

it('should do find child in tree', () => {

    cy.get('section[data-cy=child-in-tree]').as('section');
    cy.get('@section').find('button').click();

    cy.get('@section').find('[data-cy=daddy] [data-cy=child]').should('be.visible');
    cy.get('@section').find('[data-cy=daddy]').should('not.contain', 'Loading')
        .find('[data-cy=child]').should('be.visible');

    cy.get('@section').find('[data-cy=daddy]').should('be.visible')
        .find('[data-cy=child]').should('be.visible');

});

it('should do open conduit by link', () => {

    cy.get('section[data-cy=open-conduit-by-link]').as('section');
    cy.get('@section').find('a').invoke('removeAttr', 'target').click();

    cy.title().should('contain', 'Conduit');

});

it('should do open conduit in window', () => {

    cy.get('section[data-cy=open-conduit-in-window]').as('section');

    cy.window().then((window) => {
        cy.stub(window, 'open').callsFake((url) => {
            console.log('we have implemented own window.open function');
            window.location = url;
        }).as('replacedWindowOpen');
    });

    cy.get('@section').find('button').click();
    cy.get('@replacedWindowOpen').should('have.been.called');
    cy.title().should('contain', 'Conduit');

});

it('should do replace prompt', () => {

    cy.get('section[data-cy=replace-prompt]').as('section');

    cy.window().then((window) => {
        cy.stub(window, 'prompt').callsFake((message) => {
            console.log('we have implemented own window.prompt function');
            console.log(message);
            return 'XYZ';
        }).as('replacedWindowPrompt');
    });

    cy.get('@section').find('button').click();
    cy.get('@replacedWindowPrompt').should('have.been.called');
    cy.get('@section').find('button')
        .invoke('css', 'background-color').should('eq', 'rgb(255, 0, 0)');

});

it('should do replace button click', () => {

    cy.get('section[data-cy=replace-button-click]').as('section');

    cy.window().then((window) => {
        return cy.stub().callsFake(() => {
            console.log('we have implemented own button click function');
            window.location = 'https://demo.realworld.io/';
        }).as('fakeClick');
    });

    cy.get('@fakeClick').then(fake => {
        return cy.get('@section').find('button')
            .invoke('off')
            .invoke('on', 'click', fake)
            .click();
    });

    cy.get('@fakeClick').should('have.been.called');
    cy.title().should('contain', 'Conduit');

});

it('should do open conduit signup in iframe', () => {

    const iframes = [
        {
            contentDocument: {
                body: '<p>Hello from body of iframe document</p>'
            }
        }
    ];
    cy.wrap(iframes).its('0.contentDocument.body')
        .should('not.be.empty');

    cy.get('section[data-cy=open-conduit-in-iframe]').as('section');
    cy.get('@section').find('iframe')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .as('conduit');
    cy.get('@conduit').find('.navbar a[href$="/register"]').click();
    cy.get('@conduit').find('.auth-page h1').should('have.text', 'Sign up');

});

it('should do check hello from user', () => {

    cy.get('section[data-cy=hello-from-user]').as('section');
    cy.get('@section').find('user-web-component').shadow().as('user');
    cy.get('@user').find('p.hello').should('contain.text', 'Hello from');

});

it('should do change DOM', () => {

    cy.get('section[data-cy=change-dom]').as('section').scrollIntoView();
    cy.get('@section').find('p').as('message');
    cy.get('@message').invoke('css', 'background-color', 'rgb(0, 128, 0)');
    cy.get('@message').should('have.css', 'background-color', 'rgb(0, 128, 0)');
    // wait just for demo
    cy.wait(2000);
    cy.get('@message').invoke('css', 'background-color', 'rgb(128, 0, 0)');
    cy.get('@message').should('have.css', 'background-color', 'rgb(128, 0, 0)');

    const phone = '+7 920 736-12-49';
    cy.window().invoke('callMe', phone);

    cy.get('@section').invoke('html')
        .should('contain', '<a href="tel:' + phone + '">' + phone + '</a>');

});

it('should do check long mouse down', () => {

    cy.get('section[data-cy=mouse-long-down]').as('section');
    cy.get('@section').find('button').as('button').trigger('mousedown');
    cy.wait(3000);
    cy.get('@button').should('contain.text', '3.00 sec.');
    cy.get('@button').trigger('mouseup');

});

it('should do check mouse move', () => {

    cy.get('section[data-cy=mouse-move]').as('section');
    cy.get('@section').find('.canvas').as('canvas');

    for (let i = 200; i < 610; i += 10) {
        const x = 100 + i;
        const y = 100 + Math.sin(i / 20) * 20;
        cy.get('@canvas').trigger('mousemove', 100 + i, y);
        cy.wait(150);
    }

    cy.get('@canvas').find('.success').should('have.text', 'You win!');

});

it('should do check in mobile', () => {

    cy.get('section[data-cy=check-in-mobile]').should('be.visible').as('section').scrollIntoView();
    cy.get('@section').find('iframe').as('giphy').should('have.css', 'opacity', '0');
    cy.viewport('iphone-8');
    cy.get('@giphy').should('have.css', 'opacity', '1');

});

it('should do make screenshots', () => {

    cy.get('section[data-cy=make-screenshots]').should('be.visible').as('section').scrollIntoView();
    cy.get('@section').screenshot('before');
    cy.get('@section').find('input[name=user]').type('Elon Musk')
        .invoke('css', 'background', 'green');
    cy.get('@section').screenshot('after');

});

it('should do catch get user HTTP request', () => {

    cy.get('section[data-cy=catch-http]').should('be.visible').as('section');
    cy.get('@section').find('button').as('button').click();

    cy.get('@section').find('.info').as('info').should('have.text', 'Leanne Graham');

    cy.intercept('GET', '/users/1', {
        statusCode: 200,
        body: {
            name: 'Bob Marley',
            telegram: 'https://t.me/epic_one_hour'
        }
    }).as('loadUser');

    cy.get('@button').click();
    cy.wait('@loadUser');

    cy.get('@info').should('have.text', 'Bob Marley');

});

it('should do grab users', () => {

    cy.get('section[data-cy=grab-users]').should('be.visible').as('section').scrollIntoView();

    cy.get('@section').find('table tbody tr')
        .should('have.length.greaterThan', 0)
        .then(rows => {
            let users = [];
            for (const row of rows) {
                const user = [];
                for (const cell of row.children) {
                    user.push(cell.innerText);
                }
                users.push(user);
            }
            return users;
        }).as('users');

    cy.get('@users').then(users => cy.writeFile('tmp/users.json', users));
    cy.readFile('tmp/users.json').should('not.be.empty')
        .then((users) => {
            cy.log(users);
        });
});

describe('Navigation', () => {

    beforeEach(() => {
        cy.get('section[data-cy=navigation]').should('be.visible').as('navigation');
    });

    it('should navigate by path', () => {
        cy.get('@navigation').find('a.path').click();
        cy.location('pathname').should('eq', '/');
    });

    it('should navigate by query', () => {
        cy.get('@navigation').find('a.query').click();
        cy.location('search').should('eq', '?q=test');
    });

    it('should navigate by hash', () => {
        cy.get('@navigation').find('a.hash').click();
        cy.location('hash').should('eq', '#/page');
    });
});

it('should do check hero', () => {

    console.log('a');
    cy.log('a');

    let ourHero = 'Spider Man';

    const asyncOperation = new Cypress.Promise((done) => {
        setTimeout(() => {
            done('Iron Man');
        }, 2000);
    });

    cy.wrap(asyncOperation).then(hero => {
        console.log('b');
        cy.log('b');

        ourHero = hero;
        cy.log(ourHero);
    }).as('hero');

    console.log('c');
    cy.log('c');

    console.log(ourHero);

    cy.get('@hero').should('eq', 'Iron Man');

});


// https://api.jquery.com/category/selectors/
describe('jQuery features', () => {

    beforeEach(() => {
        cy.get('[data-cy=jquery-features]').as('section').scrollIntoView();
        // only for demonstration
        cy.wait(1000);
    });

    it('should do check not contains', () => {
        cy.get('@section').find('.contains li:not(:contains("Bill"))')
            .should('have.length', 2);
    });

    it('should do fade out', () => {
        cy.get('@section').find('.hide-me')
            .invoke('hide')
            .should('not.be.visible');
    });

});
