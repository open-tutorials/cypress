Navigate in list by paging test case

# It should navigate in list by paging

## Before

1. Open https://demo.realworld.io/
2. Url should be `/#/` — main page
3. Available pages in pager > 10
4. Active page in pager should be 1st

## Select random article

4. List should have 10 article cards
5. Select random article as `{random_article_title}`

## Navigate to random page

6. Click random page button from 1 to 10 as `{random_page_number}`
7. Active page in pager should be `{random_page_number}`
8. Check article with `{random_article_title}` is not presented in list

## Navigate back to 1st page

8. Click 1st page button
9. Active page in pager should be 1st
10. Check article with `{random_article_title}` is presented in list

# Where:

* `{random_article_title}` — title of selected random article
