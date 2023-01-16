<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/my_first_refactor
</md-hidden>

# Туториал: мой первый рефактор в Cypress

Подойдет тем, кто хочет начать писать чистый код тестов на Cypress.

# 👍 Что сделаем

* Наведем чистоту в коде тестов проекта.
* Узнаем про базовый URL, хуки, алиасы, фикстуры в Cypress.
* Научимся писать функции на Java Script и использовать их в тестах.

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/my_first_refactor`
* Ты установил Cypress `npm i cypress@9 --save-dev`

Если забыл, глянь в наш [первый туториал](https://www.epic1h.com/cypress_test_flight#1-инициализируем-проект)

***

# 🔢 Шаги

## +1. Готовим код

- [x] Создай файл теста `~/cypress/integration/signup.spec.js`
- [x] Скопируй код из [примера](/cypress/integration/test_mama_project/signup3.spec.js)
- [x] Проанализируй код.
- [x] Прогони тесты в Headless.

Рефакторинг кода кратко: 💩 → 💎

```diff
- 💩
- 💩
- 💩
+ 💎
```

***

## +2. Базовый URL

Во всех тестах мы открываем один и тот же URL https://demo.realworld.io/

**❗ Каждый раз мы повторяем участок кода:** `cy.visit('https://demo.realworld.io/')`

- [x] Открой файл `~/cypress.json`
- [x] Добавь в него содержимое:
```json
{
    "baseUrl": "https://demo.realworld.io/"
}
```
- [x] Во всех тестах **отрефактори:**

```diff
  describe('Sign up', () => {

      it('should do register user', () => {

-          cy.visit('https://demo.realworld.io/');
+          cy.visit('/');

          // test body ...
      }

  }
```

* ❓ Зачем нужен файл `cypress.json`?
* ❓ Что такое базовый URL?

***

## +3. Хуки

> Хук (hook) — крючек, ловушка, а по-сути перехват выполнения кода.

`beforeEach()` — позволяет выполнить участок кода перед запуском каждого теста `it()`

**❗ В каждом тесте мы повторяем открытие главной страницы приложения:** `cy.visit('/')`

Закинем это в хук `beforeEach` и сократим наш код:

```diff
  describe('Sign up', () => {

+     // will be executed before each it()
+     beforeEach(() => {
+          cy.visit('/');
+     });

      it('should do register user', () => {

-          cy.visit('/');

         // test body ...
      }

      it('should do login user', () => {

-         cy.visit('/');

          // test body ...
      }

      it('should do logout user', () => {

-         cy.visit('/');

          // test body ...
      }

  }
```

Еще больше **хуков** на сайте [docs.cypress.io](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks)

***

## +4. Алиасы

**❗ Каждый раз мы повторяем часть селекторов для получения элементов:**
```js
cy.get('.auth-page h1')
cy.get('.auth-page form')
cy.get('.auth-page form button[type=submit]')
```

Когда мы взяли нужный элемент на странице, мы можем назначить ему алиас — `.as('alias_name')`

```js
cy.get('.very .long .selector .for form[name=login]').as('loginForm');
```

Далее в коде взять элемент через алиас — `get('@alias_name')`

Получив ссылку, мы можем найти внутри него другие элементы через — `.find()`

```js
cy.get('@loginForm').find('input[name=email]').type('?');
cy.get('@loginForm').find('input[name=password]').type('?');
```

- [x] Отрефактори код на использование алиасов во всех ❗ тестах:

```diff
  describe('Sign up', () => {

      it('should do register user', () => {

          // test body ...

-         cy.get('.auth-page h1').should('have.text', 'Sign up');
-         cy.get('.auth-page form').should('be.visible');
+         cy.get('.auth-page').as('registerPage');
+         cy.get('@registerPage').find('h1').should('have.text', 'Sign up');
+         cy.get('@registerPage').find('form').should('be.visible').as('registerForm');

          // test body ...

-         cy.get('.auth-page form button[type=submit]').click();
+         cy.get('@registerForm').find('button[type=submit]').click();
      }

  }
```

***

## +5. Фикстуры

> Фикстуры (fixtures) — фиксированные данные окружения гарантирующие повторяемость процесса тестирования 🤯

В нашем коде для теста входа пользователя мы используем:
* Email — `test_anton@gmail.com`
* Пароль — `xyzXYZ123_`
* Имя пользователя — `test_anton`

- [x] Создай файл `~/cypress/fixtures/me-user.json`
- [x] Добавь содержимое в формате JSON:

```json
{
  "username": "test_anton",
  "email": "test_anton@gmail.com",
  "password": "xyzXYZ123_"
}
```

- [x] В начало файла теста добавь импорт фикстуры:

```js
import meUser from '/cypress/fixtures/me-user.json';
```

Имя `meUser` — выбрано нами самостоятельно.

- [x] Отрефактори файл теста:

```diff
- cy.get('@loginForm').find('input[ng-model$=email]').type('test_anton@gmail.com');
+ cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
- cy.get('@loginForm').find('input[ng-model$=password]').type('xyzXYZ123_');
+ cy.get('@loginForm').find('input[ng-model$=password]').type(meUser.password);

  // test body ...

- cy.get('.navbar').should('contain.text', 'test_anton');
+ cy.get('.navbar').should('contain.text', meUser.username);
```

***

## +6. Функции

> Функция — это переиспользуемый блок кода. ~"В конспект"

- [x] Создай файл `~/js_examples/say_hello.js` с содержимым:

```js
function sayHelloFor(firstName, lastName) {
    const fullName = firstName + ' ' + lastName;
    console.log('Hello', fullName);
    console.log('Today is', new Date());
}

sayHelloFor('Bob', 'Marley');
sayHelloFor('Bill', 'Gates');
sayHelloFor('Tim', 'Cook');
```

- [x] В терминале выполни `node js_examples/say_hello.js`
- [x] Скажи привет самому себе.
- [x] Поменяй вывод в функции на: Hello Marley Bob.

<details>
  <summary>Микро изменение</summary>

```js
const fullName = lastName + ' ' + firstName;
```
</details>

> Функции позволяют оформить участок кода в блок и обращаться к нему по имени.

***

### 6.1 Функция loginMe

**❗ Мы повторяем большой участок кода входа пользователя.**

- [x] Отрефактори исходный код тестов:

```diff
 import meUser from '/cypress/fixtures/me-user.json';

+ function loginMe() {
+
+     cy.get('.navbar').should('be.visible').as('appHeader');
+
+     cy.get('@appHeader').find('a[href$="/login"]').click();
+     cy.url().should('include', '/#/login');
+
+     cy.get('.auth-page').should('be.visible').as('loginPage');
+     cy.get('@loginPage').find('h1').should('have.text', 'Sign in');
+     cy.get('@loginPage').find('form').should('be.visible').as('loginForm');
+
+     cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
+     cy.get('@loginForm').find('input[ng-model$=password]').type(meUser.password);
+     cy.get('@loginForm').find('button[type=submit]').click();
+
+     cy.get('@appHeader').should('contain.text', meUser.username);
+
+ }

  describe('Sign up', () => {

      it('should do login user', () => {

-         cy.get('.navbar').should('be.visible').as('appHeader');
-
-         cy.get('@appHeader').find('a[href$="/login"]').click();
-         cy.url().should('include', '/#/login');
-    
-         cy.get('.auth-page').should('be.visible').as('loginPage');
-         cy.get('@loginPage').find('h1').should('have.text', 'Sign in');
-         cy.get('@loginPage').find('form').should('be.visible').as('loginForm');
-    
-         cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
-         cy.get('@loginForm').find('input[ng-model$=password]').type(meUser.password);
-         cy.get('@loginForm').find('button[type=submit]').click();
-    
-         cy.get('@appHeader').should('contain.text', meUser.username);
-
+         loginMe();

      });
    
      it('should do logout user', () => {

-         cy.get('.navbar').should('be.visible').as('appHeader');
-
-         cy.get('@appHeader').find('a[href$="/login"]').click();
-         cy.url().should('include', '/#/login');
-    
-         cy.get('.auth-page').should('be.visible').as('loginPage');
-         cy.get('@loginPage').find('h1').should('have.text', 'Sign in');
-         cy.get('@loginPage').find('form').should('be.visible').as('loginForm');
-    
-         cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
-         cy.get('@loginForm').find('input[ng-model$=password]').type(meUser.password);
-         cy.get('@loginForm').find('button[type=submit]').click();
-    
-         cy.get('@appHeader').should('contain.text', meUser.username);
-
+         loginMe();

          // test body ...

      });

  }
```

***

### 6.2. Функция getRandomNumber

В нашем коде есть участок, где мы генерируем случайное число от 1000 до 9999.

```js
const rnd = Math.round(Math.random() * 8999) + 1000;
```

Оформим этот участок в виде отдельной функции.

- [x] Создай файл `~/cypress/support/utils.js` с содержимым:

```js
export function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
```

* ❓ Зачем нужен `export` перед объявлением функции?

- [x] Обнови код:

```diff
+ import { getRandomNumber } from '/cypress/support/utils';

- const rnd = Math.round(Math.random() * 8999) + 1000;
+ const rnd = getRandomNumber(1000, 9999);

```

***

* ❓ Почему мы назвали файл `utils.js`?
* ❓ Почему мы положили его в папку `support`?
* ❓ Как сгенерировать используя `getRandomNumber` число от 1000000 до 9999999?

***

- [x] Сверь свой код с [эталоном](/cypress/integration/my_first_refactor/signup.spec.js)
- [x] Разберись в каждой строчке кода мастера.
- [x] Перенеси найденные улучшения к себе.

На этом сегодня все 🥳

Еще раз посмотри 👇 насколько хороший код у тебя получился.

<details>
  <summary>Теперь ты крут 😎</summary>

<iframe src="https://giphy.com/embed/GN02jU6n6lkuk" 
  width="480" height="282" frameBorder="0" class="giphy-embed"></iframe>
</details>


Еще больше туториалов 👉 https://t.me/epic_one_hour 
