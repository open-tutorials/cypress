User sign in test case

# It should do login user:

## Before

1. Open https://demo.realworld.io/

## Open login form

2. Click **Sign In** link in app header
3. Url should be `/#/login`
4. Page heading should be **Sign in**

## Fill login form

5. Page should have form
6. Type `{email}` into **Email** form field
7. Type `{password}` into **Password** form field

## Submit form

8. Click on **Sign in** button

## Check user has been login

9. Header should contains `{user_name}`

# Where:

* `{email}`
    * valid email
    * was registered before
* `{password}` — current user password
* `{user_name}` — registered user name for `{email}`
