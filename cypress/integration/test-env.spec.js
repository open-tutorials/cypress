///<reference types="cypress" />

describe('ENV', () => {

    // vi ~/.bash_profile
    // export USER_LAST_NAME=breslavskii
    // then bash -l
    // export CYPRESS_USER_LAST_NAME=$USER_LAST_NAME
    // npx cypress open
    // npx cypress open --env USER_LAST_NAME=morozov

    it('should check env from bash profile', () => {
        console.log(Cypress.env());
        expect(Cypress.env('USER_LAST_NAME')).to.eq('breslavskii');
    });
});
