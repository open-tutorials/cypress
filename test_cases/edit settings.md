Edit settings test case

# It should edit settings:

## Before

1. Open https://demo.realworld.io/
2. Repeat 1-9 from [login user](../../login_user.md)
3. Url should be `/#/` — main page

## Open settings form  

4. Click link to user profile page  
5. Click **Edit Profile Settings** button  
6. Page should have **Your Settings** form   

## Edit settings  

7. Clear all form fields  
8. Type `{new_URL}` into **URL of profile picture** form field
9. Type `{new_username}` into **Username** form field
10. Type `{new_bio}` into **Short bio about you** form field
11. Type `{new_email}` into **Email** form field  
12. Type `{new_password}` into **New Password** form field  
13. Click **Update Settings** button  

## Check settings  

14. Link to user profile page should have `{new_username}`  
15. Click **Edit Profile Settings** button  
16. **URL of profile picture** form field should have `{new_URL}`  
17. **Short bio about you** form field should have `{new_bio}`  
18. **Email** form field should have `{new_email}`  

# Where:

* `{new_URL}` — edited URL of profile picture  
* `{new_username}` — edited username  
* `{new_bio}` — edited short bio about user  
* `{new_email}` — edited email  
* `{new_password}` — edited password  