console.log(new Date().toISOString());

const it = function (name, callback) {
    console.log(name);
    callback();
}

it.only = function (name, callback) {
    console.log(name);
    callback();
}

it('should test X', () => {
    console.log('X', 'command 1');
    console.log('X', 'command 2');
});



it.only('should test Y', () => {
    console.log('Y', 'command 1');
    console.log('Y', 'command 2');
});
