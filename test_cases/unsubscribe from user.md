Unsubscribe from user test case

# It should unsubscribe from user:

## Before

1. Open https://demo.realworld.io/
2. Repeat steps 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page

## Subscribe to user by following him  

4. Repeat 4-8 from [subscribe to user](/test_cases/subscribe to user.md)    

## Unsubscribe from user by unfollowing him  

5. Find list with articles of `{user}` in feed toggle menu **Your Feed**        
6. Click button **Unfollow**
7. The button text should change to **Follow**  
8. Click **Home**
9. Click **Your Feed** in feed toggle menu
10. **Your Feed** should not have `{user}`

## Where:

- `{user}` — subscribed user  
