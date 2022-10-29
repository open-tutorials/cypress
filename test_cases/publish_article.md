Publish article test case

# It should do publish article:

## Before
1. Open https://demo.realworld.io/
2. Repeat 2-9 from [login user](login_user.md)
3. Url should be `/#/` — home page

## Open editor
4. Click **New Article** item in app header menu
5. Url should be `/#/editor/`
6. Page should have add article form

## Fill form
7. Type `{title}` into **Title** form field
8. Type `{description}` into **Description** form field
9. Type `{body}` into **Body** form field
10. Type `{tags}` into **Tags** form field

## Save article
11. Click on **Publish Article** button

## Check article data
12. Url should be `/#/article/{slug}`
13. Page title should be `{title}`
14. Article body should contains `{body}` rendered Markdown
15. Article should have `{tags}`

# Where:
* `{title}` — string with length from 20 to 50 chars
* `{description}` — string with length from 20 to 255 chars
* `{body}` — string in Markdown with length from 300 to 1000 chars
* `{tags}` — list keywords separated by comma
* `{slug}` — article url path address

### To do:
* [ ] Сlarify fields validation templates on back-end.
