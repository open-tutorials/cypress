const { faker } = require('@faker-js/faker');

function generateFakeArticle() {
    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        tags: [
            faker.word.adjective(),
            faker.word.adjective(),
            faker.word.adjective()
        ]
    };
}

const article = generateFakeArticle();
console.log('title =', article.title);
console.log('description =', article.description);
for (const tag of article.tags) {
    console.log('tag =', tag);
}

function generateFakeUser() {
    return {
        id: '?',
        email: '?',
        firstName: '?',
        lastName: '?',
        about: '?',
        job: '?',
        company: '?',
        address: {
            avatar: '?',
            country: '?',
            city: '?',
            street: '?',
            zipCode: '?'
        }
    };
}

for (let i = 0; i <= 5; i++) {
    console.log(generateFakeUser());
}