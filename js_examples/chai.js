const { expect } = require('chai');

const article = {
    slug: 'test',
    title: 'Test article',
    createdAt: '10-01-2022',
    description: 'Some article key topics',
    tagList: ['tagX', 'tagY', 'tagZ'],
    body: 'Some article content',
    favorited: false,
    favoritesCount: 5,
    updatedAt: '12-01-2022'
};

expect(article).to.have.all.keys(
    'slug',
    'title',
    'createdAt',
    'description',
    'tagList',
    'body',
    'favorited',
    'favoritesCount',
    'updatedAt'
);

const DATE_FORMAT = /^\d{2}\-\d{2}\-\d{4}$/;

expect(article.slug).to.not.be.empty;
expect(article.title).to.not.be.empty;
expect(article.createdAt).to.not.be.empty;
expect(article.createdAt).match(DATE_FORMAT, 'wrong created at date format');
expect(article.description).to.not.be.empty;
expect(article.tagList).to.be.instanceof(Array);
expect(article.tagList).have.length.greaterThan(2);
expect(article.favorited).to.be.a('boolean');
expect(article.favoritesCount).to.be.a('number');
expect(article.updatedAt).match(DATE_FORMAT, 'wrong updated at date format');
