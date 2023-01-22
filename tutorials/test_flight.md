<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/cypress_test_flight
</md-hidden>

# Туториал: первый полет на Cypress

Подойдет тем, кто хочет начать писать автоматизированные тесты.

# 👍 Что сделаем

* Создадим чистый **Java Script** проект на **Node.js**.
* Установим **Cypress** через менеджер пакетов **npm**.
* Напишем авто-тест подписки на рассылку **Cypress**.

# 💪 Минутка мотивации

Задача [End-To-End](https://qna.habr.com/q/401848) тестов — нажимать на кнопки, вводить данные в поля формы, двигать мышкой — как это делал бы человек.

Заставь компьютер работать за себя! Ты тут босс 😎

<iframe src="https://giphy.com/embed/okLCopqw6ElCDnIhuS" 
  width="480" height="400" frameBorder="0" class="giphy-embed"></iframe>

# 🙋‍ Перед началом

* Ты знаком с основами ручного тестирования приложений.
* У тебя установлен [Node.js](https://nodejs.org/) и [Visual Code](https://code.visualstudio.com/)

# 😍 Живая обратная связь

<import from="/partials/zoom_standups.md"></import>

*****

# 🔢 Шаги

> ❗ Внимание! Cypress обновил свой сайт после выхода видео.
> 
> Записанное видео, немного не соответствует туториалу и будет скоро обновлено.

Если ты любишь сначала смотреть, а потом делать [📹 Видео-туториал](https://youtu.be/lqqlaOuxrpM)

## +1. Инициализируем проект

> **Node.js** — среда выполнения **Java Script** и менеджер пакетов **npm**.

- [x] Создай папку `%/projects/cypress/test_flight`
- [x] В **Visual Code** открой папку проекта.
- [x] Открой **Терминал** → **Новый терминал**.
- [x] Выполни в терминале `npm init`
- [x] На все вопросы нажми `ENTER ↵`, в конце введи `yes` + `ENTER ↵`
- [x] Проверь что в папке проекта появился файл `package.json`

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/project_init.mp4" type="video/mp4">
</video>
</details>

***

> Главный навык хорошего IT специалиста — уметь гуглить!

Научись **формулировать вопросы** и получать ответы самостоятельно.

Начни вести свой **собственный словарь** терминов.

* ❓ Что такое [инициализация](https://www.google.com/search?q=%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F) проекта?
* ❓ Зачем нужен [файл `package.json`](https://www.google.com/search?q=%D0%97%D0%B0%D1%87%D0%B5%D0%BC+%D1%84%D0%B0%D0%B9%D0%BB+package.json)?

<details>
  <summary>Крутая фишка 😎</summary>

Можно выполнить команду `npm init -y` ~"В конспект" и файл `package.json` будет создан сразу. 
</details>

### 🤷‍♂️ Зачем мне это?

Инициализация — первый этап любого проекта. 

Ты должен проснуться в 3 часа ночи и знать как начать новый проект.

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=632)

*****

## +2. Ставим Cypress

- [x] Выполни команду `npm install cypress@9 --save-dev` ~"В конспект"

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/install_cypress.mp4" type="video/mp4">
</video>
</details>

* ❓ Зачем нужна папка `node_modules`?
* ❓ Какой версии установлен **Cypress**?
* ❓ Зачем нужен раздел **devDependencies** в `package.json`?
* ❓ Что такое **JSON**?

<details>
  <summary>Где найти все доступные версии Cypress?</summary>
  
На вкладке версии пакета **Cypress** в репозитории менеджера пакетов **NPM** https://www.npmjs.com/package/cypress
</details>

<details>
  <summary>Почему мы используем Cypress 9, а не 12?</summary>
  
* Твоя задача **изучить основы,** который **не меняются** от версии к версии.
* Я отдельно **научу** тебя **обновлять фреймворк** до любой версии.
</details>

### 🤷‍♂️ Зачем мне это?

Пакеты — это наборы **готового кода**, написанные другими разработчиками. ~"В конспект"

Зачем писать велосипеды, если их уже кто-то написал и выложил?

Легче найти нужный пакет, типа Cypress на https://npmjs.com, установить и начать использовать.

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=868)

*****

## +3. Первый запуск Cypress

- [x] Выполни команду `npx cypress open` ~"В конспект"

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/open_cypress.mp4" type="video/mp4">
</video>
</details>

* ❓ Появилась папка `cypress` в корне проекта?
* ❓ Что делает утилита `npx`?
* ❓ Что за файлы `.spec.js` лежат в папке `cypress/integration`?
* ❓ Что ты видишь в окне Cypress?

### 🤷‍♂️ Зачем мне это?

Ты должен знать как запускать Cypress в **режиме разработки тестов.**

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=1375)

*****

## +4. Запуск примера теста

- [x] В окне **Cypress** выбери `todo.spec.js`
- [x] Перезапусти тест еще раз.

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/run_todo.mp4" type="video/mp4">
</video>
</details>

* ❓ Что происходит в Chrome?

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=1595)

*****

## +5. Пишем свой тест

- [x] Нажми `CTRL` + `C` в терминале, чтобы остановить Cypress ~"В конспект"
- [x] Из папки `cypress/integration` удали `1-getting-started` и `2-advanced-examples`
- [x] Создай файл `cypress/integration/hello-cypress.spec.js`:

```js
it('should do subscribe to news letter', () => {

cy.visit('https://www.cypress.io/');

});
```

- [x] Отформатируй код ~"В конспект"
  * На Windows `SHIFT` + `ALT` + `F`
  * На MacOS `SHIFT` + `OPTION` + `F`
  * На Linux `CTRL` + `Shift` + `I`
- [x] Сохрани файл `CTRL` + `S`
- [x] Выполни команду `npx cypress open`
- [x] В окне **Cypress** выбери `hello-cypress.spec.js`

<details>
  <summary>Назойливая 🤦‍️ **mocha**</summary>

**Visual Code** постоянно добавляет строчку `const { it } = require("mocha");` и код не работает?

- [x] Пропиши в начале файла теста: ~"В конспект"
```js
///<reference types="cypress" />
```
</details>

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/write_own_test.mp4" type="video/mp4">
</video>
</details>

* ❓ Что такое `it`?
* ❓ Что такое `cy.visit`?

> ❗ Всегда используй для названия тестов шаблон `it('should do something...`

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=1719)

*****

## +6. Открываем форму подписки

- [x] Прокрути страницу в самый низ до кнопки **Subscribe to our newsletter.**
- [x] Активируй **selector playground.**

<img class="cornered" width="200" height="110" src="assets/selector_playground.png">

- [x] Наведи курсор на кнопку.
- [x] Скопируй код селектора.

<img class="cornered" width="564" height="91" src="assets/test_flight/copy_selector.png">

- [x] Обнови код теста:

```js
it('should do subscribe to news letter', () => {

    cy.visit('https://www.cypress.io/');
    cy.get('.footer-form > .border').click();

});
```

***

## +7. Заполняем форму подписки

- [x] Так же через **selector playground** наведи курсор на поле **Email.**
- [x] Скопируй код селектора.
- [x] Обнови код теста:

```js
it('should do subscribe to news letter', () => {

    cy.visit('https://www.cypress.io/');
    cy.get('.footer-form > .border').click();
    cy.wait(1000);
    cy.get('#subscribe-email').type('test@test.ru');

});
```
- [x] Замени **email** в коде на свой.
- [x] Не забудь отформатировать код!
- [x] Сохрани файл.
- [x] Переключись на окно Cypress.

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/input_email.mp4" type="video/mp4">
</video>
</details>

* ❓ Что происходит в Chrome?
* ❓ Что такое `cy.get()`? ~"В конспект"
* ❓ Что такое `#subscribe-email`?
* ❓ Что такое `.type()`? ~"В конспект"
* ❓ Что такое `cy.wait(1000)`?

> На самом деле `wait` плохая практика. Скоро ты узнаешь почему.

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=1995)

*****

## +8. Отправляем форму подписки

- [x] Найди селектор для:
  * галочки — **I agree to receive emails** 
  * кнопки — **Subscribe today**
- [x] Обнови код теста:

```js
it('should do subscribe to news letter', () => {

    cy.visit('https://www.cypress.io/');
    cy.get('.footer-form > .border').click();
    cy.wait(1000);
    cy.get('#subscribe-email').type('test@test.ru');
    cy.get('.flex > .block').click();
    cy.get('.border-t > .border').click();

});
```
- [x] Не забудь отформатировать код!

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/subscribe.mp4" type="video/mp4">
</video>
</details>


* ❓ Что происходит в Chrome?
* ❓ Что такое `.border-t > .border`?
* ❓ Что такое `.click()`? ~"В конспект"

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=2047)

*****

## +9. Проверяем подписку

- [x] Найди селектор для элемента с сообщением **Thank you for subscribing!**
- [x] Обнови код теста:

```js
it('should subscribe to news letter', () => {

    cy.visit('https://www.cypress.io/');
    cy.get('.footer-form > .border').click();
    cy.wait(1000);
    cy.get('#subscribe-email').type('test@test.ru');
    cy.get('.flex > .block').click();
    cy.get('.border-t > .border').click();
    cy.get('.leading-36px').should('have.text', 'Thank you for subscribing!');

});
```
- [x] Не забудь отформатировать код!

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/check_subscription.mp4" type="video/mp4">
</video>
</details>

* ❓ Что такое `.leading-36px`?
* ❓ Что такое `.should('have.text', '?')`? ~"В конспект"

### 🤷‍♂️ Зачем мне это?

> ❗ Тесты не просто должны кликать по кнопкам!
> 
> Задача тестов — **проверять правильность** работы программы!
> 
> Кликнул → проверь результат! ~"В конспект"

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=2100)

*****

## +10. Запускаем Cypress в Headless

- [x] Закрой **Cypress** в терминале `CTRL`+`C`
- [x] Выполни команду `npx cypress run` ~"В конспект"
- [x] В `package.json` обнови команду `test` в разделе `scripts`:

```diff
+  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "test": "cypress run"
+  }
```

- [x] Выполни команду `npm test`

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/run_headless.mp4" type="video/mp4">
</video>
</details>

* ❓ Что ты видишь в терминале?

### 🤷‍♂️ Зачем мне это?

Ты должен знать как запускать Cypress в **режиме прогона тестов.**

Уже совсем скоро, именно с помощью этой команды, ты будешь запускать свои тесты на своем сервере!

📹 [Мое объяснение](https://www.youtube.com/watch?v=l6qbqBR_zZc&t=2154)

*****

## +11. Ломаем тест

- [x] Сломай сообщение в коде:

```diff
- 'Thank you for subscribing!'
+ 'Thank you for subscribing!!!'
```
- [x] Снова запусти Cypress `npm test`

<details>
  <summary>Не получается 📹</summary>

<video width="600px" controls>
  <source src="assets/test_flight/break_test.mp4" type="video/mp4">
</video>
</details>

* ❓ Что ты видишь в терминале?
* ❓ Что лежит в паке `~/cypress/videos`?

Бинго 🥳

- [x] Сделай так, что бы тест снова работал.

### 🤷‍♂️ Зачем мне это?

Тесты могут ломаться в будущем. Ты должен уметь искать причины и исправлять их.

*****

Та да 🥳 Ты дошел до конца.

# 🙏 Фидбек пожалуйста

<import from="/partials/tutorial_feedback.md"></import>

# 👨‍🎓 Чему ты научился

```mermaid /syllabus/test_flight.mm
```

# 😭 Домашка

- [ ] [Прочитай](https://www.w3schools.com/cssref/css_selectors.php) про все типы CSS селекторов.
- [ ] [Поиграйся](https://www.w3schools.com/cssref/trysel.php) с тренажером.
- [ ] Пройди тест ниже.

Выбери **точный** селектор для элемента:

```html
<p id="success">Thank you for subscribing!</p>
```

```markdown quiz selector_for_id
- [ ] `cy.get('id=success')`
- [x] `cy.get('p#success')`
- [ ] `cy.get('p.success')`


Селектор по [id](https://www.w3schools.com/cssref/sel_id.php)
```

***

```html
<p class="success message">Thank you for subscribing!</p>
```

```markdown quiz selector_for_class
- [ ] `cy.get('[class=success]')`
- [ ] `cy.get('p#class')`
- [x] `cy.get('p.success.message')`


Селектор по классам `class="xyz zyx"`
```

***

```html
<p data-cy="success">Thank you for subscribing!</p>
```

```markdown quiz selector_for_attribute
- [x] `cy.get('p[data-cy=success]')`
- [ ] `cy.get('data-cy=success')`
- [ ] `cy.get('p.data-cy.success')`


Селектор по [аттрибутам](https://www.w3schools.com/cssref/sel_attribute_value.php)
```

***

```html
<p data-cy="success xyzXYZ">Thank you for subscribing!</p>
```

```markdown quiz selector_for_starts
- [x] `cy.get('p[data-cy^=success]')`
- [ ] `cy.get('p[data-cy.=success]')`
- [ ] `cy.get('p[data-cy?=success]')`


Селектор по [начальному значению аттрибута](https://www.w3schools.com/cssref/sel_attr_begin.php)
```

***

```html
<p data-cy="xyzXYZ success">Thank you for subscribing!</p>
```

```markdown quiz selector_for_ends
- [ ] `cy.get('p[data-cy.=success]')`
- [x] `cy.get('p[data-cy$=success]')`
- [ ] `cy.get('p[data-cy#=success]')`


Селектор по [конечному значению аттрибута](https://www.w3schools.com/cssref/sel_attribute_value_lang.php)
```

***

```html
<p data-cy="xyzXYZ success XYZxyz">Thank you for subscribing!</p>
```

```markdown quiz selector_for_contain
- [ ] `cy.get('p[data-cy^=success]')`
- [x] `cy.get('p[data-cy*=success]')`
- [ ] `cy.get('p[data-cy$=success]')`


Селектор по [содержимому значения аттрибута](https://www.w3schools.com/cssref/sel_attr_contain.php)
```

***

У тебя есть HTML документ:

```html
<h1 class="subscription">News letter subscription</h1>
<form>
  <input name="email" type="email">
  <input name="confirm-email" type="email">
  <button type="submit">Submit</button>
</form>

<h1 class="disclaimer">Disclaimer</h1>
<p>The content of this message is confidential.</p>
```

Заполни код:

```js placeholders find_selectors_for_form
cy.get('?|h1.subscription|?').should('have.text', 'News letter subscription');
// email input
cy.get('?|input[name=email]|?').type('?');
// confirm email input
cy.get('?|input[name=confirm-email]|?').type('?');
// submit button
cy.get('?|button[type=submit]|?').click();
```

# 🤩 Хочу еще

Не хватило? Поиграйся с https://automationteststore.com/

- [x] Добавь пару товаров в корзину.
- [x] Оформи заказ.

# 📹 Видео-ответы

1. [Почему не получается установить Cypress 9?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=156&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Почему хорошо начать программировать через авто-тестирование?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=406&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Что важно знать при написании авто-тестов?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=779&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как тестировщик взаимодействует с разработчиками?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=956&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Можно ли в Cypress через Xpath искать элементы?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=1150&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Какой уровень английского должен быть у тестировщика?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=1206&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как заставить себя изучать английский язык?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=1303&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [В чем задача туториалов?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=1442&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
1. [Как найти проект для портфолио тестировщика?](https://www.youtube.com/watch?v=QYaMokV4k8A&t=1495&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)
