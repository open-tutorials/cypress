Edit article test case

# It should edit article:

## Before
1. Open https://demo.realworld.io/
2. Repeat 1-9 from [login user](login_user.md)
3. Url should be `/#/` — main page

## Add article
4. Repeat 4-11 from [publish article](publish_article.md)

## Find article
5. Click `{user_name}` link in app header
6. Url should be `/#@{user_name}` — user profile page
7. My articles menu item should be active
8. Click on `{title}` link in articles list
9. Click on **Edit article** button

## Edit article
10. Url should start from `/#/editor/`
11. Page should have edit article form
12. Type `{new_title}` into **Title** form field
13. Type `{new_description}` into **Description** form field
14. Type `{new_body}` into **Body** form field
15. Type `{new_tags}` into **Tags** form field
16. Click on **Publish Article** button

## Check article
12. Url should be `/#/article/{slug}`
13. Page title should be `{new_title}`
14. Article body should contains `{new_body}` rendered Markdown
15. Article should have `{new_tags}`

# Where:
* `{new_title}` — string with length from 20 to 30 chars
* `{new_description}` — string with length from 20 to 100 chars
* `{new_body}` — string in Markdown with length from 100 to 1000 chars
* `{new_tags}` — list keywords separated by comma
* `{slug}` — article url path address
