Publish article test case

# It should do publish article:

## Before
1. Open https://demo.realworld.io/
2. Repeat 1-9 from [login user](login_user.md)
3. Url should be `/#/` — home page

## Add article 
4. Click **New Article** item in app header menu
5. Url should be `/#/editor/`
6. Page should have add article form 
7. Type `{title}` into **Title** form field
8. Type `{description}` into **Description** form field
9. Type `{body}` into **Body** form field
10. Type `{tags}` into **Tags** form field
11. Click on **Publish Article** button

## Check article
12. Url should be `/#/article/{slug}`
13. Page title should be `{title}`
14. Article body should contains rendered Markdown

# Where:
* `{title}` — string with length from 20 to 30 chars
* `{description}` — string with length from 20 to 100 chars
* `{body}` — string in Markdown with length from 100 to 1000 chars
* `{tags}` — list keywords separated by comma
* `{slug}` — article url path address
