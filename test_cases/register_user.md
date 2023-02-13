User sign up test case

# It should do register user:

## Before

1. Open https://demo.realworld.io/

## Open register form

2. Click **Sign Up** link in app header
3. Url should be `/#/register`
4. Page heading should be **Sign up**

## Fill register form

5. Page should have form
6. Type `{user_name}` into **Username** form field
7. Type `{email}` into **Email** form field
8. Type `{password}` into **Password** form field

## Submit form

9. Click on **Sign up** button

## Check user has been login

10. Header should contains `{user_name}`

# Where:

* `{user_name}`
    * string with pattern `[0-9a-zA-Z_]{5, 10}`
    * was not registered before
* `{email}`
    * valid email
    * was not registered before
* `{password}` — string with pattern `[0-9a-zA-Z_]{6, 16}`
