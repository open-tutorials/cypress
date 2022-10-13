User logout test case

# It should do user logout:
1. Open https://demo.realworld.io/
1. Repeat 1-9 from [login user](login_user.md)
1. Click **Settings** link in app header
1. Page title should be **Your Settings**
1. Click **Logout** button in page bottom
1. Url should be `/#/` — home page
1. Header should not contains `{user_name}`

# Where:
* `{user_name}` — name logged in user