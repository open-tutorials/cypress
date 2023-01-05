Subscribe to user test case

# It should do subscribe to user:

## Before

1. Open https://demo.realworld.io/
2. Repeat 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page

## Delete all subscriptions

4.  In feed toggle menu should be active **Your Feed**
5.  Select random article
6.  Click button **Unsubscribe**
7.  Confirm that the button text changes to **Subscribe**
8.  Click **Home**
9.  Check **Your Feed** contain text "No articles are here... yet."

## Select random article

10. Click **Global Feed** in feed toggle menu
11. List should have 10 article cards
12. Select random article

## Subscribe to user by following him

13. Click buttun **Follow**
14. Confirm that the button text changes to **Unsubscribe**

## Check user in your subscription list

15. Click **Home**
16. In feed toggle menu should be active **Your Feed**
17. Check `{author}` should be visible

## Where:

- `{author}` — subscribed author
