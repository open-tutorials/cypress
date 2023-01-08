# Туториал: тестируем мама проект на Cypress

Подойдет тем, кто хочет научиться писать авто-тесты на примере реального WEB-приложения.

# 👍 Что сделаем

* Опишем **тест-кейсы в Markdown** на основании спецификации на проект.
* Прокачаем твой Java Script для Cypress на **конкретных** примерах.
* **Напишем тесты** для регистрации, логина и выхода пользователя.

# 💪 Минутка мотивации

Твои коллеги по команде **написали приложение** для ведения блогов — аналог https://vc.ru/

Ты должен помочь 💪 им выпустить **качественный продукт** на рынок.

* Это будет **первый** написанный тобою код для проекта!
* Считай, это твой **проходной билет** в авто-тесты и программирование.
* Сможешь пройти и получить **удовольствие** — считай ты на борту!

<iframe src="https://giphy.com/embed/bzE1WAm8BifiE" 
  width="480" height="362" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/test_conduit`
* Ты установил Cypress `npm i cypress@9 --save-dev`

# 🤝 Дисклеймер

* 🤭 Сейчас твой код будет не очень.
* 😉 В следующем туториале твой код будет лучше.
* 😜 Еще через пару туториалов он будет прекрасен.

***

# 🔢 Шаги

## +1. Мама всех демо-приложений

[Conduit](https://demo.realworld.io/) — open source клон [medium.com](https://www.medium.com)

- [x] Открой проект на [GitHub](https://github.com/gothinkster/realworld)
- [x] Найди в описании комментарий:

> The **mother** of all demo apps — exemplary fullstack https://www.medium.com clone.

<mark>Задача: познакомится со спецификацией на проект.</mark>

- [x] Найди ссылку на спецификацию: **View our starter guide & spec**
- [x] В спецификации перейди в раздел: **Frontend → Routing**

<details>
  <summary>Не получается 📹</summary>

Что серьезно, не смог найти? 😱

</details>

* ❓ Что такое спецификация?
* ❓ Что такое фронтенд?
* ❓ Что такое роутинг?
* ❓ Что описано в документе?
* ❓ Чем это может быть полезно для составления текст-кейсов?

📹 [Мое объяснение](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=683)

***

## +2. Пишем тест-кейсы на вход и регистрацию

[Routing guidelines](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing/) — дает нам представление о структуре приложения и его функциональных возможностях.

Это помогает понять состав фичей которые мы будем тестировать.

- [x] Напиши 👇 тест-кейсы для функций **регистрации** и **входа:**

<block>

### User sign-up test case

#### It should do register user:
1. Open https://demo.realworld.io/
1. Click <md-placeholder value="Sign up"></md-placeholder> link in app header
1. Url path should be `/#/register`
1. Page title should be <md-placeholder value="Sign up"></md-placeholder>
1. Page should have form
1. Type `{username}` into **Username** form field
1. Type `{email}` into <md-placeholder value="Email"></md-placeholder> form field
1. Type `{password}` into <md-placeholder value="Password"></md-placeholder> form field
1. Click on <md-placeholder value="Sign up"></md-placeholder> button
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

### User sign-in test case

#### It should do login user:
1. Open https://demo.realworld.io/
1. Click <md-placeholder value="Sign in"></md-placeholder> link in app header
1. Url path should be <md-placeholder value="/#/login"></md-placeholder>
1. Page title should be <md-placeholder value="Sign in"></md-placeholder>
1. Page should have form
1. Type `{email}` into <md-placeholder value="Email"></md-placeholder> form field
1. Type `{password}` into <md-placeholder value="Password"></md-placeholder> form field
1. Click on <md-placeholder value="Sign in"></md-placeholder> button
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

<mark>Скучно 🥱? Неинтересно 🤮? Хочется сразу бежать писать код и на это забить 😜?</mark>

> ❗ Прежде, чем писать код, тест-кейс нужно выполнить в ручную!

📹 [Мое объяснение](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=1112)

*** 02:00 ***

## +3. Переносим тест-кейсы в код

> Задача любого теста — стабильно выполняться.

Каждый запуск теста будет **добавлять в базу данных** на бекенде указанные нами `username` и `email`

Если эти данные повторяться → тест будет 🔴 провален.

На текущий момент у нас **нет доступа** к базе данных приложения, что бы делать **сброс** перед прогоном.

> ❗ Поэтому, нам нужно **генерировать** новое имя пользователя и email.

- [x] Создай файл `~/js_examples/rnd.js` с содержимым:

```js
const rnd = Math.round(Math.random() * 8999) + 1000;
console.log('rnd =', rnd);

const username = 'user_' + rnd;
console.log('username =', username);

const email = username + '@gmail.com';
console.log('email =', email);
```

- [x] В терминале выполни `node js_examples/rnd.js`
- [x] Повтори команду 3-5 раз.

> Помни про самые полезные клавиши `TAB` и `↑` при работе с терминалом.

<img class="cornered" width="800" height="257" src="assets/test_mama_project/rnd.gif">

* ❓ Что делает `Math.random` и `Math.round`?
* ❓ Что фактически хранится в константе `rnd`?
* ❓ Как сгенерировать число от 100000 до 999999?

📹 [Мое объяснение](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2069)

*** 05:00 ***

## +4. Код теста регистрации пользователя

Наши тест-кейсы можно объединить в тест-сьют **Sign up**, т.к. они оба связанны с авторизацией пользователя.

- [x] Заполни **пропуски** в коде:

```js placeholders register_user
describe('Sign up', () => {
    
    it.only('should do register user', () => {
        
        // open https://demo.realworld.io/
        cy.visit('https://demo.realworld.io/');
        
        // click Sign Up link in app header
        cy.get('?|.navbar a[href$="/register"]|?').click();
        
        // url should be /#/register
        cy.url().should('include', '?|/#/register|?');

        // page title should be Sign up
        cy.get('.auth-page h1').should('have.text', '?|Sign up|?');

        // page should have form
        cy.get('?|.auth-page form|?').should('be.visible');

        // generate random integer from 1000 to 9999
        const rnd = Math.round(Math.random() * 8999) + 1000;

        // username was not registered before
        const username = 'user_' + rnd;

        // email was not registered before
        const email = username + '@gmail.com';

        // type username form field
        cy.get('.auth-page form input[ng-model$=username]').type(username);

        // type email form field
        cy.get('?|.auth-page form input[ng-model$=email]|?').type(email);

        // password should be with pattern [0-9a-zA-Z_]{6, 16}
        // type password form field
        cy.get('?|.auth-page form input[ng-model$=password]|?').type('xyzXYZ123_');

        // click on Sign up button
        cy.get('?|.auth-page form button[type=submit]|?').click();

        // header should contains {username}
        cy.get('?|.navbar|?').should('contain.text', username);

    });

    it('should do login user', () => {

        // TODO: write test body later

    });

});
```
- [x] Перенеси код в файл `~/cypress/integration/signup.spec.js`

* ❓ Зачем нужен `describe`?
* ❓ Чем отличается `it.only()` от `it()`?

*** 15:00 ***

- [x] Сверь свой код с [эталоном](/cypress/integration/test_mama_project/signup1.spec.js)
- [x] Запусти тест в **Headless** режиме.

*** 5:00 ***

## +5. Код теста входа пользователя

- [x] Заполни **пропуски** в коде:

```js placeholders login_user
describe('Sign up', () => {
    
    it('should register user', () => {
        
        // TODO: your test body

    });

    it.only('should do login user', () => {
        
        // open https://demo.realworld.io/
        cy.visit('https://demo.realworld.io/');

        // click Sign In link in app header
        cy.get('?|.navbar a[href$="/login"]|?').click();

        // url should be /#/login
        cy.url().should('include', '?|/#/login|?');

        // page title should be Sign in
        cy.get('?|.auth-page h1|?').should('have.text', '?|Sign in|?');

        // page should have form
        cy.get('?|.auth-page form|?').should('be.visible');

        // type email form field
        cy.get('?|.auth-page form input[ng-model$=email]|?').type('?');

        // type password form field
        cy.get('?|.auth-page form input[ng-model$=password]|?').type('?');

        // click on sign in button
        cy.get('?|.auth-page form button[type=submit]|?').click();

        // header should contains {username}
        cy.get('?|.navbar|?').should('contain.text', '?');
        
    });

});
```

- [x] Перенеси код в файл теста.
- [x] Зарегистрируй в ручную пользователя и пропиши его данные в код.

*** 10:00 ***

- [x] Приведи свой код в соответствии с [эталоном](/cypress/integration/test_mama_project/signup2.spec.js)
- [x] Запусти тест в **Headless** режиме `npx cypress run`

*** 05:00 ***

## +6. README для тест-кейсов

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
- [x] Перенеси в них Markdown из примеров [register](/test_cases/register_user.md?plain=1) и [login](/test_cases/login_user.md?plain=1)
- [x] Открой файл `README.md` в режиме просмотра <img src="assets/preview_md.png" width="30" height="30">

<details>
  <summary>Что ты видишь? 😂</summary>

<iframe src="https://giphy.com/embed/3NtY188QaxDdC" 
  width="480" height="480" frameBorder="0" class="giphy-embed"></iframe>
</details>

📹 [Мое объяснение](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2518)

***

## +7. Тест-кейс выхода пользователя

- [x] Создай файл  `~/test_cases/logout_user.md`
- [x] Опиши тест-кейс для фичи **logout user** в Markdown.

*** 10:00 ***

- [x] Приведи свой тест-кейс в соответствии с [эталоном](/test_cases/logout_user.md?plain=1)
- [x] Добавь ссылку на новый файл в `README.md`
- [x] Добавь отметку, что кейс написан `[x]`

## +8. Код теста выхода пользователя

- [x] Напиши тест на Cypress.

*** 10:00 ***

- [x] Приведи свой код в соответствии с [эталоном](/cypress/integration/test_mama_project/signup3.spec.js)
- [x] Запусти все тесты в Headless режиме.
- [x] Найди и выпиши участки кода которые повторяются.

***

Та да 🥳 Ты дошел до конца.

# 👨‍🎓 Чему ты научился

```mermaid https://raw.githubusercontent.com/breslavsky/hello-cypress/main/syllabus/test_mama_project.mm

```

# Что дальше

- У тебя вопросы?
- Тебе нужна поддержка и мотивация?

Каждый вторник и четверг я провожу стендапы в Zoom со всеми желающими.

Все подробности в Телеграм 👉 https://t.me/epic_one_hour 

@[Anton Breslavsky|https://t.me/breslavsky_anton|https://s.epic1h.com/api/public/dl/nfCyhZhd?inline=true]

# Читать-смотреть

* [Артем Ерошенко — тест-кейсы как код](https://www.youtube.com/watch?v=Prm2-c_5mYs)

# 📹 Видео-ответы

1. [С чего начинать тестирование нового проекта?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=682&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как определить состав фичей на проекте?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=922&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Что такое роутинг на фронтенде?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=966&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как писать тест-кейсы в Markdown?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=1111&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как связать тест-кейс с кодом?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=1349&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как сгенерировать целое случайное число в Java Script?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2068&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как запустить только один тест в Cypress?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2230&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Что такое README файлы?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2518&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как не повторять шаги в тест-кейсах?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2590&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как не дублировать код в авто-тестах?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=2665&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как добавить текущую дату к любой строке?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=3529&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как проверить что Markdown отображается корректно?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=3763&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Что значит не правильный селектор?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=4558&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Где использовать регулярные выражения в тестах?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=4919&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Почему тесты должны быть изолированы друг от друга?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=5009&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Какие частые ошибки у начинающих авто-тестировщиков?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=5548&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Что такое цепочка поиска элементов?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=5739&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Почему не получается запустить Java Script файл в Node.js?](https://www.youtube.com/watch?v=TD1X0-JB_Fs&t=5963&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)