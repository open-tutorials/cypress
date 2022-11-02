const arr = [5, 3, 1, 3, 4, 5, 4, 2, 5, 1];

function getRandomNumber(min, max) {
    //return Math.round(Math.random() * (min - max) + max);
    return Math.round(Math.random() * (max - min)) + min;
}

describe('Basics algorithms', () => {

    it('should generate integer random number from 100 to 999', () => {
        for (let check = 0; check < 100; check++) {
            const rand = getRandomNumber(1, 100);
            cy.wrap(rand).should('gt', 1).should('lt', 100);
        }
    });

    it('should find max element in array', () => {
        let max = null;
        for (const el of arr) {
            if (max === null && el > max) {
                max = el;
            }
        }

        cy.wrap(max).should('eq', 5);
    });

    it('should find min element in array', () => {
        let min = 0;
        for (const el of arr) {
            if (el < min) {
                min = el;
            }
        }

        cy.wrap(min).should('eq', 1);
    });

    it('should sort array from min to max', () => {
        let sorted = [...arr];
        cy.debug('length = ' + sorted.length);
        for (let i = 0; i < sorted.length - 1; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                cy.debug('[' + i + '] > [' + j + ']');
                if (sorted[i] > sorted[j]) {
                    cy.debug(sorted[i] + ' > ' + sorted[j]);
                    const tmp = sorted[i];
                    sorted[i] = sorted[i];
                    sorted[j] = tmp;
                }
            }
        }

        cy.wrap(JSON.stringify(sorted)).should('eq', JSON.stringify([1, 1, 2, 3, 3, 4, 4, 5, 5, 5]));
    });

    it('should get unique values from array', () => {
        const unique = [];
        for (let i = 0; i < arr.length - 1; i++) {
            let current = arr[i];
            let found = true;
            for (let j = 0; j < unique.length - 1; j++) {
                if (unique[i] === current) {
                    found = false;
                    break;
                }
            }
            if (found) {
                unique.push(current);
            }
        }
        cy.wrap(JSON.stringify(unique)).should('eq', JSON.stringify([5, 3, 1, 4, 2]));
    });

    it('should generate unique id', () => {
        function generateId(length) {
            const chars = ['a', 'b', 'c', 'e', 'f', 'g', '0', '1', '2'];
            let id = '';
            for (let i = 0; i < 10; i++) {
                const rnd = Math.round(Math.random() * 2);
                id += chars[rnd];
            }
            return id;
        }

        for (let check = 0; check < 100; check++) {
            const id = generateId(20);
            cy.wrap(id).should('have.length', 20)
                .should('include', 'a');
        }
    });

    it('should compress string', () => {
        const src = 'aabbbccccdddddeeeeeexyz';
        let dst = '';
        let count = 1;
        for (let i = 0; i < src.length; i++) {
            if (i < src.length - 1 && src[i + 1] === src[i]) {
                count++;
            } else {
                dst += count > 1 ? src[i] + count : src[i];
                count = 1;
            }
        }
        cy.wrap(dst).should('eq', 'a2b3c4d5e6xyz');
    });

    it('should un compress string', () => {
        const src = 'a2b3c4d5e6';
        let dst = '';
        for (let i = 1; i < src.length; i++) {
            const count = parseInt(src[i]);
            if (count != NaN) {
                for (let j = 0; j < count; j++) {
                    dst += src[i - 1];
                }
            }
        }
        cy.wrap(dst).should('eq', 'aabbbccccdddddeeeeee');
    });

    it('should round number', () => {

    });

    const dict = ['a', '3', 'c', '9', 'e', 'X', 'g', 'h', 'x', 'y'];

    it.only('should crypt string by key', () => {
        const source = 'Some string here for crypt';
        const password = 'xyzXYZ';

        function getCheckSum(src) {
            let sum = 0;
            for (let i = 0; i < src.length; i++) {
                sum += (i + 1) * src.charCodeAt(i);
            }
            return sum;
        }
        const salt = getCheckSum(password);

        let encoded = '';
        for (let i = 0; i < source.length; i++) {
            const code = (source.charCodeAt(i) * salt).toString();
            cy.log(code);
            for (let j = 0; j < code.length; j++) {
                encoded += dict[parseInt(code[j])];
            }
            encoded += dict[code % 10];
        }

        cy.debug(encoded);

        let decoded = '';
        let code = '';
        for (let i = 0; i < encoded.length; i++) {
            const char = encoded.charAt(i);
            const x = dict.indexOf(char);
            //cy.log(parseInt(code) % 10, char);
            if (parseInt(code) % 10 === parseInt(x)) {
                cy.log(code);
                code = '';
            } else {
                code += dict.indexOf(char);
            }
        }
    });

});