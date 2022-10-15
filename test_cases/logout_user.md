User logout test case

# It should do user logout:

## Before
1. Open https://demo.realworld.io/
2. Repeat 1-9 from [login user](login_user.md)
3. Url should be `/#/` — main page

## Logout user
4. Click **Settings** item in app header menu
5. Page title should be **Your Settings**
6. Click **Logout** button in page bottom
7. Url should be `/#/` — home page
8. Header should not contains `{user_name}`

# Where:
* `{user_name}` — name logged-in user