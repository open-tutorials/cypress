This file contains check list for [project](https://demo.realworld.io/)

# Contents

- [Layout](#layout)
- [UI/UX](#uiux)
- [Features](#features)
- [Security](#security)

# Layout

## Header

- [ ] Header is visible
- [ ] Logo is presented with link to main page
- [ ] Menu items are presented

### For anonymous user

- [ ] Menu items should contain
  - [ ] **Home** page
  - [ ] **Sign in** page
  - [ ] **Sign up** page

### For logged in user

- [ ] Menu items should contain
  - [ ] **Home**
  - [ ] **New Article**
  - [ ] **Settings**
  - [ ] Link to user profile page

## Content

- [ ] Welcome banner in the middle of the page should contain
  - [ ] Name
  - [ ] Slogan
- [ ] List of articles on the left side
- [ ] Field with tags on the right side
- [ ] Paging at the bottom of a page

## Footer

- [ ] GitHub link
- [ ] Contact information
- [ ] Legal information

# UI/UX

- [ ] All the links are valid and lead to correct pages
- [ ] All the fields have placeholders
- [ ] All the mandatory fields are validated
- [ ] All the mandatory fields have asterix sign
- [ ] All the error messages match with the field label
- [ ] Home link is on every single page
- [ ] Confirmation message is displayed for any kind of update and delete operation
- [ ] Scroll bar appears only if required

# Security

- [ ] HTTPs is used
- [ ] Important information like password displays in encrypted format
- [ ] If password is changed user can't login with old password
- [ ] Error messages don't display any important information
- [ ] Cookies don't store passwords

# Cross browser testing

- [ ] Chrome >= 60
- [ ] FireFox >= ?
- [ ] Safari >= ?
- [ ] Opera >= ?
- [ ] Yandex >= ?

# Cross device testing

- [ ] iPhone >= 6
  - [ ] Chrome
  - [ ] Safari

# Features

## Sign up

### Register user

- [ ] Fill in registration form with valid data
- [ ] Check header contains username  


### Login user

- [ ] Fill in authorization form with valid data
- [ ] Check header contains username

### Logout user

- [ ] Logout user
- [ ] Check header doesn't contain username  


## Articles

### Publish article

- [ ] Open editor
- [ ] Fill in form
- [ ] Save article
- [ ] Check article data

### Delete article

- [ ] Find my article
- [ ] Delete article
- [ ] Check article is deleted  


### Edit article

- [ ] Find article
- [ ] Edit article
- [ ] Check new article data  


## Global feed

### Display article

- [ ] Check article list
- [ ] Check article card

### Filter articles by tag

- [ ] Select random tag
- [ ] Check articles list has the tag

### Like article

- [ ] Select random article
- [ ] Like/unlike article
- [ ] Likes count is increased +1/ Likes count is decreased -1

### Navigate in list by paging

- [ ] Select random article
- [ ] Navigate to random page
- [ ] Check the article is not presented in list
- [ ] Navigate back to 1st page
- [ ] Check the article is presented in list

### Open article detail page

- [ ] Open random article
- [ ] Check page title has the article's title

## Commenting

### Add comment to article

- [ ] Select first article
- [ ] Fill in form with comment
- [ ] Check comments list has the comment  


### Delete comment to article

- [ ] Select first article
- [ ] Add comment
- [ ] Delete comment
- [ ] Check comments list doesn't have the comment

## Social

### Subscribe to user

- [ ] Find user
- [ ] Subscribe to user by following him
- [ ] Check user in your subscription list

### Personal articles feed

- [ ] Publish article
- [ ] Open personal articles feed
- [ ] Check published article in personal articles feed

### Unsubscribe from user

- [ ] Find user you are following
- [ ] Unsubscribe from user by unfollowing him
- [ ] Check user is deleted from your subscription list

## User settings

### Edit settings

- [ ] Open settings form
- [ ] Edit form
- [ ] Check new settings data
