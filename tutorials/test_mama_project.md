# Туториал: тестируем мама проект на Cypress

Подойдет тем, кто хочет научиться писать авто-тесты на примере реального WEB-приложения.

# 👍 Что сделаем

* Опишем тест-кейсы в Markdown на основании спецификации на проект.
* Прокачаем свой Java Script для Cypress на конкретных примерах.
* Напишем тесты для регистрации, логина и выхода пользователя.

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/test_conduit`
* Ты установил Cypress `npm i cypress@9 --save-dev`

# Дисклеймер

* 🤭 Сейчас твой код будет не очень.
* 😉 В следующем туториале твой код будет лучше.
* 😜 Еще через пару туториалов он будет прекрасен.

***

# 🔢 Шаги

## 1. Мама всех демо-приложений

[Conduit](https://demo.realworld.io/) — open source клон [medium.com](https://www.medium.com)
> 
> The mother of all demo apps — exemplary fullstack Medium.com clone powered by React, Angular, Node, Django, and many more 🏅

**Задача: познакомится со спецификацией на проект.**

- [x] Открой проект на [GitHub](https://github.com/gothinkster/realworld)
- [x] Найди ссылку на спецификацию: **View our starter guide & spec**
- [x] В спецификации найди раздел: **Frontend → Routing**

<details>
  <summary>Не получается 📹</summary>

Что серьезно, не смог найти? 😱

</details>

* ❓ Что описано в документе?
* ❓ Чем это может быть полезно для составления текст-кейсов?

***

## 2. Пишем тест-кейсы на вход и регистрацию

[Routing guidelines](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing/) — дает нам представление о структуре приложение и его функциональных возможностей.

Это помогает понять, что мы будем тестировать.

👇 Напишем тест-кейсы для фичей **регистрации** и **входа.**

<block>

### User sign up test case

#### It should do register user:
1. Open https://demo.realworld.io/
1. Click **Sign Up** link in app header
1. Url should be `/#/register`
1. Page title should be **Sign up**
1. Page should have form
1. Type `{username}` into **Username** form field
1. Type `{email}` into **Email** form field
1. Type `{password}` into **Password** form field
1. Click on **Sign up** button
1. Header should contains `{username}`

#### Where:
* `{username}`
  * string with pattern `[0-9a-zA-Z_]{5, 10}`
  * was not registered before
* `{email}`
  * valid email
  * was not registered before
* `{password}` — string with pattern `[0-9a-zA-Z_]{6, 16}`

</block>

<block>

### User sign in test case

#### It should do login user:
1. Open https://demo.realworld.io/
1. Click **Sign In** link in app header
1. Url should be `/#/login`
1. Page title should be **Sign in**
1. Page should have form
1. Type `{email}` into **Email** form field
1. Type `{password}` into **Password** form field
1. Click on **Sign in** button
1. Header should contains `{username}`

#### Where:
* `{email}`
  * valid email
  * was registered before
* `{password}` — current user password
* `{username}` — registered user name for `{email}`

</block>

- [x] Переведи тест-кейсы на русский язык и проговори их.
- [x] Выполни их в ручную.

*** 02:00 ***

## 3. Переносим тест-кейсы в код

Задача любого теста — стабильно выполняться.

Каждый запуск теста будет добавлять в базу данных указанные нами `username` и `email`. 

Если эти данные повторяться — тест будет 🔴 провален.

На текущий момент у нас нет доступа к базе данных приложения.

**❗ Поэтому, нам нужно генерировать новое имя пользователя и email при каждом запуске теста.**

- [x] Создай файл `~/js_examples/rnd.js` с содержимым:

```javascript
const rnd = Math.round(Math.random() * 8999) + 1000;
console.log('rnd =', rnd);
const username = 'user_' + rnd;
console.log('username =', username);
const email = username + '@gmail.com';
console.log('email =', email);
```

- [x] В терминале выполни `node js_examples/rnd.js`
- [x] Повтори команду 3-5 раз.

<img width="926" height="298" src="assets/test_mama_project/rnd.gif">

* ❓ Что делает `Math.random` и `Math.round`?
* ❓ Что фактически хранится в константе `rnd`?

*** 05:00 ***

Данные тест-кейсы можно объединить в тест-сюит **Sign up**, т.к. они оба связанны с авторизацией пользователя.

- [x] Создай файл теста `~/cypress/integration/signup.spec.js`
- [x] Добавь заготовку для кода теста:

```javascript
describe('Sign up', () => {
    
    it.only('should do register user', () => {
        
        // open https://demo.realworld.io/
        cy.visit('https://demo.realworld.io/');
        
        // click Sign Up link in app header
        cy.get('?').click();
        
        // url should be /#/register
        cy.url().should('include', '?');

        // page title should be Sign up
        cy.get('?').should('have.text', '?');

        // page should have form
        cy.get('?').should('be.visible');

        // generate random integer from 1000 to 9999
        const rnd = Math.round(Math.random() * 8999) + 1000;

        // username was not registered before
        const username = 'user_' + rnd;

        // email was not registered before
        const email = username + '@gmail.com';

        // type username form field
        cy.get('?').type(username);

        // type email form field
        cy.get('?').type(email);

        // password should be with pattern [0-9a-zA-Z_]{6, 16}
        // type password form field
        cy.get('?').type('xyzXYZ123_');

        // click on Sign up button
        cy.get('?').click();

        // header should contains {username}
        cy.get('?').should('contain.text', username);

    });

    it('should do login user', () => {

        // TODO: write test body later

    });

});
```
- [x] Напиши тело теста регистрации пользователя самостоятельно.

* ❓ Зачем нужен `describe`?
* ❓ Чем отличается `it.only()` от `it()`?

*** 15:00 ***

- [x] Сверь свой код с [примером](cypress/integration/test_mama_project/signup1.spec.js)
- [x] Запусти тест в **Headless** режиме.

*** 5:00 ***

- [x] Добавь заготовку для кода теста логина:

```js
describe('Sign up', () => {
    
    it('should register user', () => {
        
        // TODO: your test body

    });

    it.only('should do login user', () => {
        
        // open https://demo.realworld.io/
        cy.visit('https://demo.realworld.io/');

        // click Sign In link in app header
        cy.get('?').click();

        // url should be /#/login
        cy.url().should('include', '?');

        // page title should be Sign in
        cy.get('?').should('have.text', '?');

        // page should have form
        cy.get('?').should('be.visible');

        // type email form field
        cy.get('?').type('?');

        // type password form field
        cy.get('?').type('?');

        // click on sign in button
        cy.get('?').click();

        // header should contains {username}
        cy.get('?').should('contain.text', '?');
        
    });

});
```

- [x] Зарегистрируй в ручную пользователя и пропиши его данные в код.
- [x] Напиши тело теста.

*** 10:00 ***

- [x] Сверь свой код с [примером](cypress/integration/test_mama_project/signup2.spec.js)
- [x] Запусти тест в **Headless** режиме.

*** 05:00 ***

## 4. `README` для тест-кейсов

- [x] Создай файл `~/test_cases/README.md`
- [x] Добавь Markdown:

```markdown
This file contains test cases for [Conduit project](https://demo.realworld.io/)

# Sign up
* [x] [register user](register_user.md)
* [x] [login user](login_user.md)
* [ ] logout user
```

- [x] Создай файлы `test_cases/register_user.md` и `test_cases/login_user.md`
- [x] Перенеси в них Markdown из примеров [register](test_cases/register_user.md?plain=1) и [login](test_cases/login_user.md?plain=1)
- [x] Открой файл `README.md` в режиме просмотра <img src="assets/preview_md.png" width="30" height="30">

<details>
  <summary>Что ты видишь? 😂</summary>

<iframe src="https://giphy.com/embed/3NtY188QaxDdC" 
  width="480" height="480" frameBorder="0" class="giphy-embed"></iframe>
</details>

***

## 5. Тест-кейс — выход пользователя

- [x] Создай файл  `~/test_cases/logout_user.md`
- [x] Опиши тест-кейс для фичи **logout user** в Markdown
- [x] Добавь ссылку на новый файл в `README.md`

*** 10:00 ***

- [x] Сверь свои результаты с примером [logout user](test_cases/logout_user.md?plain=1)
- [x] Напиши тест на Cypress.

*** 10:00 ***

- [x] Сверь свой код с [примером](cypress/integration/test_mama_project/signup.spec.js)
- [x] Найди и выпиши участки кода которые повторяются.
- [x] Запусти все тесты в Headless режиме.

Та да 🥳 Ты дошел до конца.

# Что дальше?

- У тебя вопросы?
- Тебе нужна поддержка и мотивация?

Каждый вторник и четверг я провожу стендапы в Zoom со всеми желающими.

Все подробности в Телеграм 👉 https://t.me/epic_one_hour 

@[Anton Breslavsky|https://t.me/breslavsky_anton|https://s.epic1h.com/api/public/dl/nfCyhZhd?inline=true]

# Фидбек пожалуйста 🙏

? Полезный материал ?
* 🤩 Очень полезный материал
* 😃 В целом полезный
* 😐 Возможно что-то пригодится
* 😒 Нет ничего полезного
* 😬 Абсолютно бесполезно

? Все ли было понятно ?
* 🤩 Все понятно на 100%
* 😃 В целом все понятно
* 😐 Что-то понятно, что-то нет
* 😒 Понял только малую часть
* 😬 Ничего не понял

? Как тебе такой формат Туториала ?
* 🤩 Очень удобно
* 😃 Мне понравилось
* 😐 Нормально
* 😒 Не удобно
* 😬 Ужасно

# Артефакты
* [Артем Ерошенко — тест-кейсы как код](https://www.youtube.com/watch?v=Prm2-c_5mYs)
