Subscribe to user test case

# It should do subscribe to user:

## Before

1. Open https://demo.realworld.io/
2. Repeat 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page

## Delete all my articles

4. Click on button that contain username
5. If articles is list not empty then
    * click button **Delete**
    * go to step 4

## Delete all subscriptions

6.  In feed toggle menu should be active **Your Feed**
7.  Your Feed contains text "No articles are here... yet"?
    * No, continue.
    * Yes, go to step 11.
8. Select first article    
9.  Click button **Unfollow**
10.  Confirm that the button text changes to **Follow**
11.  Click **Home**
12. Back to step 4

## Select first article

13. Click **Global Feed** in feed toggle menu
14. List should have 10 article cards
15. Select first article

## Subscribe to user by following him

16. Click button **Follow**
17. Confirm that the button text changes to **Unfollow**

## Check user in your subscription list

18. Click **Home**
17. In feed toggle menu should be active **Your Feed**
19. Check `{author}` should be visible

## Where:

- `{author}` — subscribed author