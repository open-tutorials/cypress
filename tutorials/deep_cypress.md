# Туториал: как устроен Cypress внутри

Подойдет тем, кто хочет понять как работает Cypress.

# 👍 Что сделаем

* Проведем 10+ экспериментов в Cypress.
* Узнаем про: таумауты, стабы, триггеры, инвоукы, вьюпорты, врапы, промисы и т.д.
* Научимся делать 📸 скриншоты, читать и записывать файлы через Cypress.
* Сграбим данные пользователей с сайта через Cypress.

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/deep_cypress`
* Ты установил Cypress `npm i cypress@9 --save-dev`

***

# 🔢 Шаги

## 1. Подготовка Веб-сервера

Тебе нужно разместить тестовое веб-приложение на локальном веб-сервере.

- [x] Установи через терминал пакет `npm i tiny-server --save-dev`
- [x] В `package.json` добавь команду `start` в раздел `scripts` для запуска сервера:

```diff
  "scripts": {
+   "start": "tiny-server",
  }
```

- [x] Запусти в терминале `npm start`
- [x] Открой в **Chrome** http://localhost:3000

***

## 2. Загрузка тестового приложения

Веб-сервер готов, нужно скачать [тестовое приложение](https://github.com/breslavsky/hello-cypress/blob/main/apps/deep-cypress.html) с **GitHub**.

- [x] Открой **Новый терминал.**
- [x] Установи пакет `npm i node-wget --save-dev`
- [x] Создай папку `apps` в корне проекта.
- [x] В терминале выполни команду:

```bash
npx wget -- -d apps/ https://raw.githubusercontent.com/breslavsky/hello-cypress/main/apps/deep-cypress.html
```

- [x] Проверь, что появился файл `~/apps/deep-cypress.html`
- [x] Обнови страницу в Chrome.
- [x] В списке файлов выбери `apps/deep-cypress.html`

***

## 3. Поиск элементов в DOM

- [x] Создай файл теста `deep-cypress.spec.js` с содержимым:

```js
beforeEach(() => {
    cy.visit('http://localhost:3000/apps/deep-cypress.html');
});

it.only('should do long like', () => {

    cy.get('section[data-cy=long-like]').as('section');
    cy.get('@section').find('button').click();
    cy.get('@section').find('[data-cy=success]', { timeout: 5000 })
        .should('have.text', 'Well done!');
});
```

- [x] Проверь, что тест 🟢 проходит.

***

- [x] Измени код:

```diff
- cy.get('@section').find('[data-cy=success]', { timeout: 5000 })
+ cy.get('@section').find('[data-cy=success]', { timeout: 3000 })
```

- [x] Проверь, что тест 🔴 провален.

* ❓ Что такое `timeout`?
* ❓ Почему при значении `5000` тест проходит, а при `3000` нет?
* ❓ Какой `timeout` в Cypress [по умолчанию?](https://www.google.com/search?q=default+timeout+in+cypress)

***

- [x] Добавь в файл `cypress.json`:

```diff
+ "defaultCommandTimeout": 10000
```

- [x] Не забудь 🔥 отформатировать JSON.
- [x] Перезапусти Cypress.
- [x] Убери `timeout` в коде для команды:

```diff
- cy.get('@section').find('[data-cy=success]', { timeout: 3000 })
+ cy.get('@section').find('[data-cy=success]')
```
- [x] Проверь, что тест снова выполняется 🟢 успешно.

* ❓ Что делает параметр `defaultCommandTimeout`?

***

## 4. Цепочки команд

- [x] Добавь новый тест:

```js
it.only('should do find child in tree', () => {

    cy.get('section[data-cy=child-tree]').as('section');
    cy.get('@section').find('button').click();
    cy.get('@section').find('[data-cy=daddy] [data-cy=child]').should('be.visible');

});
```

- [x] 🔥 Не забудь удалить у предыдущего теста `.only`
- [x] Проверь, что тест 🟢 проходит.

***

- [x] Измени код:

```diff
- cy.get('@section').find('[data-cy=daddy] [data-cy=child]').should('be.visible');
+ cy.get('@section').find('[data-cy=daddy]').should('be.visible')
+   .find('[data-cy=child]').should('be.visible');
```

- [x] Проверь, что тест 🔴 провален.

* ❓ Почему тест перестал проходить?

> If the assertion that follows the `cy.get()` command 🟢 passes, then the command finishes successfully.

- [x] Найди этот комментарий на [cypress.io](https://docs.cypress.io/guides/core-concepts/retry-ability#Commands-vs-assertions)

***

- [x] Измени код:

```diff
- cy.get('@tree').find('[data-cy=daddy]').should('be.visible')
+ cy.get('@tree').find('[data-cy=daddy]').should('not.contain', 'Loading')
```
- [x] Проверь, что тест снова выполняется 🟢 успешно.

* ❓ Почему тест снова проходит?

***

## 5. Работа с несколькими вкладками

- [x] Добавь новый тест:

```js
it.only('should do open conduit by link', () => {

    cy.get('section[data-cy=open-conduit-by-link]').as('section');
    cy.get('@section').find('a').invoke('removeAttr', 'target').click();
    cy.title().should('contain', 'Conduit');

});
```

- [x] Проверь, что тест 🟢 проходит.

* ❓ Что делает `cy.title()`?

***

- [x] Измени код:

```diff
- cy.get('@section').find('a').invoke('removeAttr', 'target').click();
+ cy.get('@section').find('a').click();
```

- [x] Проверь, что тест 🔴 провален.

* ❓ Что не может сделать Cypress?
* ❓ За что отвечает аттрибут `target` в ссылках?
* ❓ Что делает команда `invoke('removeAttr', 'target')`?

> Понять и простить — Cypress не поддерживает управление [несколькими вкладками](https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs)

- [x] Верни код обратно.

***

## 6. Заглушка функций

- [x] Добавь новый тест:

```js
it.only('should do open conduit in window', () => {

    cy.get('section[data-cy=open-conduit-in-window]').as('section');
    cy.get('@section').find('button').click();
    cy.title().should('contain', 'Conduit');

});
```

- [x] Проверь, что тест 🔴 провален.
- [x] Проинспектируй HTML код кнопки.

* ❓ Что не может сделать Cypress?
* ❓ Что делает кнопка на `onclick`?
* ❓ Что такое [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)?

***

- [x] Добавь код перед нажатием на кнопку:

```diff
+ cy.window().then((window) => {
+     cy.stub(window, 'open').callsFake((url) => {
+         console.log('we have implemented own window.open function');
+         window.location = url;
+     });
+ });
```

- [x] Проверь, что тест 🟢 проходит.

* ❓ Что ты сделал с помощью команды `stub`?
* ❓ Что делает `window.location = url`?

***

## 7. Работа с iframe

> По умолчанию браузер изолирует фреймы друг от друга на странице.

- [x] Добавь в файл `cypress.json`:

```diff
+ "chromeWebSecurity": false
```

- [x] Перезапусти Cypress.

* ❓ Что делает данный параметр?

***

- [x] Добавь новый тест:

```js
it.only('should do open conduit signup in iframe', () => {

    cy.get('section[data-cy=open-conduit-in-iframe]').as('section');
    cy.get('@section').find('iframe')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .as('conduit');
    cy.get('@conduit').find('.navbar a[href$="/register"]').click();
    cy.get('@conduit').find('.auth-page h1').should('have.text', 'Sign up');

});
```

- [x] Проверь, что тест 🟢 проходит.

* ❓ Что делает команда `its('0.contentDocument.body')`?
* ❓ На какой элемент ссылается алиас `@conduit`?

***

- [x] Измени код:

```diff
- .should('not.be.empty')
```

- [x] Проверь, что тест 🔴 провален.

* ❓ Что не может сделать Cypress?

- [x] Верни код обратно.

***

## 8. Теневой DOM

- [x] Добавь новый тест:

```js
it.only('should do check hello from user', () => {

    cy.get('section[data-cy=hello-from-user]').as('section');
    cy.get('@section').find('user-component').as('user');
    cy.get('@user').find('p.hello').should('contain.text', 'Hello from');

});
```

- [x] Проверь, что тест 🔴 провален.
- [x] Проинспектируй HTML код секции.

```html
<section data-cy="hello-from-user">
    <p>User should say hello.</p>
    <user-web-component>
        #shadow-root ↓
            <style>p { color: red; }</style>
            <p class="hello">Hello from shadow Anton!</p>
    </user-web-component>
</section>
```

* ❓ Что за тэг `user-web-component`?
* ❓ Что такое `#shadow-root` в дереве элементов?
* ❓ Почему Cypress не может найти `p.hello`?
* ❓ Почему стиль цвета параграфа красный не применился к параграфу вне `user-web-component`?

***

- [x] Измени код:

```diff
- cy.get('@section').find('user-component').as('user');
+ cy.get('@section').find('user-component').shadow().as('user');
```

- [x] Проверь, что тест 🟢 проходит.

* ❓ Что делает `shadow()`?

***

## 9. Инвоук

> Cypress может взаимодействовать с DOM: вызывать функции, читать и устанавливать свойства элементов и т.д.

- [x] Добавь новый тест:

```js
it.only('should do change DOM', () => {

    cy.get('section[data-cy=change-dom]').as('section').scrollIntoView();
    cy.get('@section').find('p').as('message');
    cy.get('@message').invoke('css', 'background-color', 'rgb(0, 128, 0)');
    cy.get('@message').should('have.css', 'background-color', 'rgb(0, 128, 0)');
    // wait just for demo
    cy.wait(2000);
    cy.get('@message').invoke('css', 'background-color', 'rgb(128, 0, 0)');
    cy.get('@message').should('have.css', 'background-color', 'rgb(128, 0, 0)');

    const phone = '+7 920 736-12-49';
    cy.window().invoke('callMe', phone);

    cy.get('@section').invoke('html')
        .should('contain', '<a href="tel:' + phone + '">' + phone + '</a>');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Проинспектируй HTML секции.

* ❓ Что делает `invoke('css', ...)`?
* ❓ Что делает `cy.window().invoke()`?
* ❓ Что делает `invoke('html')`?

***

## 10. Триггеры

## 10.1. Нажатие мышкой

- [x] Добавь новый тест:

```js
it.only('should do check long mouse down', () => {

    cy.get('section[data-cy=mouse-long-down]').as('section');
    cy.get('@section').find('button').as('button').trigger('mousedown');
    cy.wait(3000);
    cy.get('@button').should('contain.text', '3.00 sec.');
    cy.get('@button').trigger('mouseup');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Прочитай [спецификацию](https://docs.cypress.io/api/commands/trigger) на команду `trigger`

* ❓ Что делает `trigger('mousedown')`?
* ❓ Что делает `cy.wait(3000)`?
* ❓ Что делает `trigger('mouseup')`?

***

## 10.2. Движение мышкой

```js
it.only('should do check mouse move', () => {

    cy.get('section[data-cy=mouse-move]').as('section');
    cy.get('@section').find('.canvas').as('canvas');

    cy.get('@canvas').then(e => e.position()).its('top').as('top');

    cy.get('@top').should('not.null').then(top => {
        for (let i = 200; i < 610; i += 10) {
            cy.get('@canvas').trigger('mousemove', {
                pageX: 100 + i,
                pageY: top + 100 + Math.sin(i / 20) * 20
            });
            cy.wait(150);
        }
    });

    cy.get('@canvas').find('.success').should('have.text', 'You win!');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Прочитай [спецификацию](https://docs.cypress.io/api/commands/trigger#Specify-the-exact-clientX-and-clientY-the-event-should-have) на `mousemove`

* ❓ Что делает [`position()`](https://www.google.com/search?q=position())?
* ❓ Что делает `its('top')`?
* ❓ Что делает `trigger('mousemove', {pageX: ?, pageY: ?}`?
* ❓ Что будет если установить `cy.wait(50)`?

***

## 11. Вьюпорт

- [x] Добавь новый тест:

```js
it.only('should do check in mobile', () => {

    cy.get('section[data-cy=check-in-mobile]').should('be.visible').as('section').scrollIntoView();
    cy.get('@section').find('iframe').as('giphy').should('have.css', 'opacity', '0');
    cy.viewport('iphone-4');
    cy.get('@giphy').should('have.css', 'opacity', '1');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Прочитай [спецификацию](https://docs.cypress.io/api/commands/viewport) на команду `viewport`

* ❓ Что делает `scrollIntoView()`?
* ❓ Что делает `viewport('iphone-4')`?
* ❓ Что делает `should('have.css', ...)`?
* ❓ Как сделать этот тест для iPhone14?

***

## 12. Скриншоты

```js
it.only('should do make screenshots', () => {

    cy.get('section[data-cy=make-screenshots]').should('be.visible').as('section').scrollIntoView();
    cy.get('@section').screenshot('before');
    cy.get('@section').find('input[name=user]').type('Anton')
        .invoke('css', 'background', 'green');
    cy.get('@section').screenshot('after');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Найди файлы скриншотов `~/cypress/screenshots`
- [x] Что делает `invoke('css', 'background', 'green')`?
- [x] Что значит `before` и `after`?

***

## 13. Перехват сетевых запросов

- [x] Добавь новый тест:

```js
it.only('should do catch get user HTTP request', () => {

    cy.get('section[data-cy=catch-http]').should('be.visible').as('section');
    cy.get('@section').find('button').as('button').click();

    cy.get('@section').find('.info').as('info').should('have.text', 'Leanne Graham');

    cy.intercept('GET', '/users/1', {
        statusCode: 200,
        body: {
            name: 'Bob Marley',
            telegram: 'https://t.me/epic_one_hour'
        }
    }).as('loadUser');

    cy.get('@button').click();
    cy.wait('@loadUser');

    cy.get('@info').should('have.text', 'Bob Marley');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Проинспектируй HTML секции.
- [x] Открой консоль в браузере.
- [x] Найди функцию `loadUser()`

* ❓ Что делает `cy.intercept()`?
* ❓ Какой URL мы перехватываем?
* ❓ Зачем нужен `cy.wait('@loadUser')`?

- [x] Поменяй имя в тесте на свое.

> Кстати, так можно перехватить не только XHR запросы, но и картинки, стили даже iframe и т.д.

***

## 14. Локейшен

Переходя по ссылкам мы проверяем, что [URL](https://en.wikipedia.org/wiki/URL#syntax) приложения меняется.

```js
cy.url().should('include', '/');
```

`cy.url()` — возвращает базовый URL + текущий путь страницы внутри приложения.

> Код выше будет работать для всех страниц приложения т.к. они все начинаются с `/`

* ❓ Как тогда проверить, что мы перешли именно на главную страницу `/`?

- [x] Добавь новые тесты:

```js
describe.only('Navigation', () => {
    
    beforeEach(() => {
        cy.get('section[data-cy=navigation]').should('be.visible').as('navigation');
    });

    it('should navigate by path', () => {
        cy.get('@navigation').find('a.path').click();
        cy.location('pathname').should('eq', '/');
    });

    it('should navigate by query', () => {
        cy.get('@navigation').find('a.query').click();
        cy.location('search').should('eq', '?q=test');
    });

    it('should navigate by hash', () => {
        cy.get('@navigation').find('a.hash').click();
        cy.location('hash').should('eq', '#/page');
    });
});
``` 

* ❓ Что делает `cy.location('pathname')`?
* ❓ Что делает `cy.location('search')`?
* ❓ Что делает `cy.location('hash')`?

***

## 15. Грабим сайты

> Ничего криминального 🥴 grab — это захватывать.

- [x] Добавь новый тест:

```js
it.only('should do grab users', () => {
    
    cy.get('section[data-cy=grab-users]').should('be.visible').as('section').scrollIntoView();

    cy.get('@section').find('table tbody tr')
        .should('have.length.greaterThan', 0)
        .then(rows => {
            let users = [];
            for (const row of rows) {
                const user = [];
                for (const cell of row.children) {
                    user.push(cell.innerText);
                }
                users.push(user);
            }
            return users;
        }).as('users');

    cy.get('@users').then(users => cy.writeFile('tmp/users.json', users));
    cy.readFile('tmp/users.json').should('not.be.empty')
        .then((users) => {
            cy.log(users);
        });

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Проверь содержимое файла `~/tmp/users.json`
- [x] Проинспектируй HTML секции и сравни с JSON в файле.

* ❓ Что содержит массив `row.children`?
* ❓ Зачем нужен `return users`?

***

## 16. Промисы для искушенных 🤯

> Промисы — это основа [асинхронного программирования](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise), а Cypress весь асинхронный!

- [x] Добавь новый тест:

```js
it.only('should do check hero', () => {

    console.log('a');
    cy.log('a');

    let ourHero = 'Spider Man';

    const asyncOperation = new Cypress.Promise((done) => {
        setTimeout(() => {
            done('Iron Man');
        }, 2000);
    });

    cy.wrap(asyncOperation).then(hero => {
        console.log('b');
        cy.log('b');

        ourHero = hero;
        cy.log(ourHero);
    }).as('hero');

    console.log('c');
    cy.log('c');

    console.log(ourHero);

    cy.get('@hero').should('eq', 'Iron Man');

});
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Открой консоль в Chrome под Cypress.
- [x] Повтори тест несколько раз.
- [x] Сверь журнал вывода Cypress и консоль в Chrome.

* ❓ Что такое `Cypress.Promise`?
* ❓ Что такое  `setTimeout`?
* ❓ Почему в консоли Chrome порядок не правильный — `acb`?

***

Та да 🥳 Ты дошел до конца.

Если, что вот [полный код](cypress/integration/deep-cypress.spec.js) всех тестов.

<details>
  <summary>Правда все просто? 😂</summary>

<iframe src="https://giphy.com/embed/BbJdwrOsM7nTa" 
    width="480" height="411" frameBorder="0" class="giphy-embed"></iframe>
</details>

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
