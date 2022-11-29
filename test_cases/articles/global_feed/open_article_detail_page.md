Open article detail page test case

# It should open article detail page

## Before

1. Open https://demo.realworld.io/
2. Url should be `/#/` — main page

## Open random article

3. List should have 10 article cards
4. Click random article as `{random_article_title}`

## Check article

5. Url should start `/#/article/` — article detail page
6. Page title should be `{random_article_title}`

# Where:

* `{random_article_title}` — title of clicked random article
