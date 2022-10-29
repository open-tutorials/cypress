import { faker } from '@faker-js/faker';

function generateFakeArticle() {
    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
    };
}

const article = generateFakeArticle();
console.log('title =', article.title);
console.log('description =', article.description);

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

for (let i = 0; i <= 10; i++) {
    console.log(generateFakeUser());
}