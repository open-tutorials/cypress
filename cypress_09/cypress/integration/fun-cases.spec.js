///<reference types="cypress" />
import { faker } from '@faker-js/faker';

it('should do check QR code', () => {

    cy.visit('/apps/fun-cases.html');

    cy.get('section[data-cy=qr-code]').should('be.visible').as('section').scrollIntoView();

    cy.get('@section').find('img').then(image => {
        const url = image.attr('src');
        cy.task('readQRCode', url).should('eq', 'https://demo.realworld.io/');
    });

});

it('should do book delivery', () => {

    cy.visit('/apps/fun-cases.html');

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

describe('Report in XLSX', () => {

    const REPORT_FILE_NAME = 'users_report.xlsx';

    beforeEach(() => {
        cy.visit('/apps/fun-cases.html');

        cy.get('section[data-cy=check-xlsx-report]')
            .should('be.visible').as('section');
    });

    function checkSpreadsheet() {

        cy.get('@spreadsheetInJson')
            .should('not.be.empty')
            .then(spreadsheet => {
                const [sheet1] = spreadsheet;
                debugger;
                expect(sheet1.name).be.eq('Users');
                const { data: rows } = sheet1;

                expect(rows).eql([
                    ['First Name', 'Last Name', 'Email'],
                    ['Elon', 'Musk', 'elon@gmail.com'],
                    ['Bill', 'Gates', 'bill@gmail.com']
                ]);
            });

    }

    it('should do check report by link', () => {

        cy.get('@section').find('a.download')
            .invoke('attr', 'href')
            .then(href => {
                cy.task('downloadFile', [href, REPORT_FILE_NAME])
                    .then(tmpFile => cy.task('xlsxToJson', tmpFile)
                        .as('spreadsheetInJson'));
            });

        checkSpreadsheet();
    });

    it('should do check report by button', () => {

        cy.window().then((window) => {
            cy.stub(window, 'open').callsFake((url) => {
                return url;
            }).as('replacedWindowOpen');
        });

        cy.get('@section').find('button').click();
        cy.get('@replacedWindowOpen').should('have.been.called')
            .its('returnValues.0')
            .then(url => {
                cy.task('downloadFile', [url, REPORT_FILE_NAME])
                    .then(tmpFile => cy.task('xlsxToJson', tmpFile)
                        .as('spreadsheetInJson'));
            });

        checkSpreadsheet();

    });

    it('should do check report by browser download', () => {

        cy.get('@section').find('a.download').click();

        cy.task('waitFile', 'cypress/downloads/users_report.xlsx')
            .then(tmpFile => cy.task('xlsxToJson', tmpFile)
                .as('spreadsheetInJson'));

        checkSpreadsheet();

    });

});

describe.only('Signup', () => {

    const BACKEND_BASE_URL = 'http://localhost:8081/';
    const DEFAULT_BASE_URL = Cypress.config('baseUrl');

    before(() => {
        cy.log('set base url to backend');
        Cypress.config('baseUrl', BACKEND_BASE_URL);
    });

    after(() => {
        cy.log('reset base url');
        Cypress.config('baseUrl', DEFAULT_BASE_URL);
    });

    it('register user by email by confirmation', () => {

        cy.task('createDisposableMailbox')
            .then(({ id, emailAddress }) => {
                const payload = { email: emailAddress };

                cy.log(emailAddress);
                cy.pause();

                cy.request({ method: 'POST', url: '/confirm-email', body: payload })
                    .then(({ status }) => {
                        expect(status).to.eq(200);
                    });

                cy.task('getLastMessage', id).then(({ body }) => {
                    expect(body).to.not.be.empty;
                    const [, code] = body.match(/code\sis\s(\d{4})/);
                    cy.log(code);
                    return cy.wrap({ id, email: emailAddress, code });
                }).as('confirmationCode');
            });

        cy.get('@confirmationCode')
            .should('not.be.empty')
            .then(({ id, email, code }) => {
                const name = faker.name.fullName();
                const payload = { email, code, name };
                cy.request({ method: 'POST', url: '/register', body: payload })
                    .then(({ status, body }) => {
                        expect(status).to.eq(200);
                        expect(body).to.includes(name);
                    });
                cy.pause();

                cy.task('deleteMailbox', id)
                    .then(success => {
                        expect(success).to.be.true;
                        cy.log('mailbox deleted');
                    });
            });
    });

    it.only('register user by email by secret', () => {
        const secret = Cypress.env('SECRET');
        expect(secret).to.not.be.empty;

        const name = faker.name.fullName();
        const payload = { email: faker.email, name };
        cy.request({
            method: 'POST',
            url: '/register',
            body: payload,
            headers: {
                'x-secret': secret
            }
        }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.includes(name);
        });

    });

});