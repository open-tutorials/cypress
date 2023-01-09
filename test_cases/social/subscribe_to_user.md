Subscribe to user test case

# It should do subscribe to user:

## Before

1. Open https://demo.realworld.io/
2. Repeat 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page

## Delete all subscriptions

4.  In feed toggle menu should be activ **Your Feed**
5.  Your Feed contains text "No articles are here... yet"?
    * No, continue.
    * Yes, go to 11.
6. Select first article    
7.  Click button **Unfollow**
8.  Confirm that the button text changes to **Follow**
9.  Click **Home**
10. Back to step 4

## Select random article

11. Click **Global Feed** in feed toggle menu
12. List should have 10 article cards
13. Select first article

## Subscribe to user by following him

14. Click buttun **Follow**
15. Confirm that the button text changes to **Unfollow**

## Check user in your subscription list

16. Click **Home**
17. In feed toggle menu should be activ **Your Feed**
18. Check `{author}` should be visible

## Where:

- `{author}` — subscribed author
