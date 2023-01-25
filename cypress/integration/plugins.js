///<reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Plugins', () => {

    it('should echo message', () => {

        const message = faker.lorem.sentence();
        cy.task('echo', message).should('eq', message);

    });
    
});
