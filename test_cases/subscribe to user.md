Subscribe to user test case

# It should subscribe to user:

## Before
1. Open https://demo.realworld.io/
2. Repeat 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page  

## Select random user  
 
4. Click **Global Feed** in feed toggle menu  
5. List should have 10 article cards with usernames  
6. Select random username  
7. Random user's page is opened  
   
## Subscribe to user by following him

8. Click button **Follow**
9. The button text should change to **Unfollow**
10. Click **Home**  
11. Click **Your Feed** in feed toggle menu    
12. **Your Feed** should have `{user}`  

## Where:

- `{user}` — subscribed user  