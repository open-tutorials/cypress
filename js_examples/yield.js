function* getNumbersAsYielded() {
    for (let i = 1; i < 1000000000; i++) {
        yield i * i;
    }
}

function getNumbersAsArray() {
    const arr = [];
    for (let i = 1; i < 1000000000; i++) {
        arr.push(i);
    }

    return arr;
}

const heavy = getNumbersAsYielded();
// const heavy = getNumbersAsArray();
let i = 0;
for (const element of heavy) {
    // to do something
    const x = element / element;

    if (i++ > 100) {
        break;
    }
}