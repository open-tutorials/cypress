function sayHelloFor(firstName, lastName) {
    const fullName = firstName + ' ' + lastName;
    console.log('Hello', fullName);
    console.log('Today is', new Date());
}

sayHelloFor('Bob', 'Marley');
sayHelloFor('Bill', 'Gates');
sayHelloFor('Tim', 'Cook');
