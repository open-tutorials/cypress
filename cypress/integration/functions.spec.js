describe('Functions', () => {

    it('should add 2 digits', () => {

        function add(one, two) {
            return one + -two;
        }

        const result = add(5, add(1, add(4, -1)));
        cy.wrap(result).should('eq', 12);

    });

    it('should pow number', () => {

        function pow(what, where) {
            let result = 1;
            for (let i = 0; i < where; i++) {
                result *= what;
            }
            return result;
        }

        // 2^8 = 256
        const result = pow(2, 8);
        cy.wrap(result).should('eq', 256);

    });

    it.only('get all names in tree', () => {
        function getNames(person) {
            const names = [person.name];
            for (const child of person.children) {
                const fromChild = getNames(child);
                names.push(...fromChild);
            }
            return names;
        }

        const anton = {
            name: 'Anton',
            children: [
                {
                    name: 'Maksim',
                    children: [
                        {
                            name: 'Jester',
                            children: []
                        }
                    ]
                },
                {
                    name: 'Eva',
                    children: []
                }
            ]
        };
        const allNames = getNames(anton);

        cy.wrap(allNames).should('eq', ['Anton', 'Maksim', 'Jester', 'Eva']);

    });
});