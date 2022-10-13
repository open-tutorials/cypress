User sign up test case

# It should do register user:
1. Open https://demo.realworld.io/
1. Click **Sign Up** link in app header
1. Url should be `/#/register`
1. Page title should be **Sign up**
1. Page should have form
1. Type `{user_name}` into **Username** form field
1. Type `{email}` into **Email** form field
1. Type `{password}` into **Password** form field
1. Click on **Sign up** button
1. Header should contains `{user_name}`

# Where:
* `{user_name}`
  * string with pattern `[0-9a-zA-Z_]{5, 10}`
  * was not registered before
* `{email}`
  * valid email
  * was not registered before
* `{password}` — string with pattern `[0-9a-zA-Z_]{6, 16}`
