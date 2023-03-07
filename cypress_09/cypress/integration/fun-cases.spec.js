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

it('should do book delivery', () => {

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
