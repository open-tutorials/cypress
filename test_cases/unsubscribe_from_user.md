Unsubscribe from user test case

# It should do unsubscribe from user:

## Before

1. Open https://demo.realworld.io/
2. Repeat steps 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page

## Delete all my articles

4. Click on button that contain username
5. If articles is list not empty then
    * click button **Delete**
    * go to step 4

## Checking for a subscribtion

6.  In feed toggle menu should be active **Your Feed**
7.  Your Feed contains text "No articles are here... yet"?
    * No, go to step 14.
    * Yes, continue.

## Subscribe to user by following him

8. Click **Global Feed** in feed toggle menu
9. List should have 10 article cards
10. Select first article
11. Click buttun **Follow**
12. Confirm that the button text changes to **Unfollow**

## Check user in your subscription list

13. Click **Home**
14. In feed toggle menu should be active **Your Feed**
15. Check `{authorFollowed}` should be visible

## Unsubscribe from user by unfollowing him

16. Select first article    
17. Click button **Unfollow**
16. Confirm that the button text changes to **Follow**
18. Click **Home**
19. In feed toggle menu should be active **Your Feed**
20. Check that your subscription list does not contain `{authorUnfollowed}`

## Where:

- `{authorFollow}` — subscribed author
- `{authorUnfollow}` - unsubscribed author