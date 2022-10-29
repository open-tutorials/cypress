Delete article test case

# It should delete article:

## Before
1. Open https://demo.realworld.io/
2. Repeat 2-9 from [login user](login_user.md)
3. Url should be `/#/` — main page

## Add article
4. Repeat 4-11 from [publish article](publish_article.md)

## Open me profile
5. Click `{user_name}` link in app header
6. Url should be `/#@{user_name}` — user profile page

## Find my article
7. My articles menu item should be active
8. Click on `{title}` link in articles list

## Delete article
9. Click on **Delete article** button

## Check article has been deleted
10. My articles list should not have `{title}`

# Where:
* `{title}` — article title added by user
* `{user_name}` — name logged-in user
