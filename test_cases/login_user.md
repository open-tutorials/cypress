User sign in test case

# It should do login user:
1. Open https://demo.realworld.io/
1. Click **Sign In** link in app header
1. Url should be `/#/login`
1. Page title should be **Sign in**
1. Page should have form
1. Type `{email}` into **Email** form field
1. Type `{password}` into **Password** form field
1. Click on **Sign in** button
1. Header should contains `{user_name}`
1. Url should be `/#/` — main page

# Where:
* `{email}`
  * valid email
  * was registered before
* `{password}` — current user password
* `{user_name}` — registered user name for `{email}`