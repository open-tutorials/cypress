<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/cypress_test_flight
</md-hidden>

# Туториал: обновляем Cypress

Подойдет тем, кто хочет понять весь процесс обновления пакетов в Node.js.

# 👍 Что сделаем

* Научимся читать **ченджлог** и примечания к выпуску **новых** версий пакетов.
* Выполним обновление Cypress в **ручную.**
* Выполним обновление **автоматически.**

# 😍 Живая обратная связь

<import from="/partials/zoom_standups.md"></import>

# 💪 Минутка мотивации

Это ты когда увидишь новую версию Cypress на экране 😂

<iframe width="560" height="315" src="https://www.youtube.com/embed/TUxYTdlcUMw?start=12" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/upgrade_cypress`
* Ты установил Cypress `npm i cypress@9 --save-dev`

Если забыл, глянь в наш [первый туториал](https://www.epic1h.com/cypress_test_flight#1-инициализируем-проект)

***

# 🔢 Шаги

## +1. Загружаем проект

- [x] Создай скрипт загрузки файлов проекта `download.js` с [содержимым](/download.js)
- [x] Создай файл `mama_files.txt` со списком загрузки:

```text
cypress_09/cypress/fixtures/me-user.json|cypress/fixtures/

cypress_09/cypress/support/index.js|cypress/support/
cypress_09/cypress/support/commands.js|cypress/support/
cypress_09/cypress/support/shared2.js|cypress/support/|shared.js
cypress_09/cypress/support/utils.js|cypress/support/
cypress_09/cypress/plugins/index1.js|cypress/plugins/|index.js

cypress_09/cypress/integration/upgrade_cypress/signup.spec.js|cypress/integration/
cypress_09/cypress/integration/upgrade_cypress/articles/crud.spec.js|cypress/integration/articles/
cypress_09/cypress/integration/upgrade_cypress/articles/global-feed.spec.js|cypress/integration/articles/
cypress_09/cypress/integration/upgrade_cypress/commenting.spec.js|cypress/integration/
cypress_09/cypress/integration/api.spec.js|cypress/integration/
cypress_09/cypress/integration/plugins.spec.js|cypress/integration/
cypress_09/cypress.json|
```

- [x] Установи wget `npm i node-wget --save-dev`
- [x] Запусти в терминале:

```bash
export BASE_URL=https://raw.githubusercontent.com/open-tutorials/cypress/main 
node download.js
```

- [x] Проверь, что файлы проекта загрузились.
- [x] Прогони все тесты в Headless режиме.
- [x] Исправь 🔴 ошибки в тестах.

Сразу хочешь сбежать 🤨 в подсказки? А кто потом на работе это будет делать?

<details>
  <summary>Что делать?</summary>

- [x] Поставь пакет [Faker](https://github.com/faker-js/faker)

```bash
npm i @faker-js/faker --save-dev
```

И всего-то!

</details>

***

## +2. Примечания к выпуску

- [x] Загугли **cypress changelog**
- [x] Открой **release notes** для версии [10.0.0](https://docs.cypress.io/guides/references/changelog#10-0-0)

* ❓ Что такое **Changelog?**
* ❓ Что такое **Release notes?**
* ❓ Когда эта версия была выпущена — <md-placeholder value="6/1/2022"></md-placeholder>

- [x] Найди комментарий ниже:

> Read our **Migration Guide** which explains some **breaking changes** in more detail.

- [x] Переведи комментарий на русский язык.

* ❓ Что такое **Migration guide?**
* ❓ Что такое **Breaking changes?**

***

Типичный **Changelog** любой программы:

| **major.minor.build** | **notes**                        |
|-----------------------|----------------------------------|
| 0.0.1                 | MVP                              |
| 1.0.0                 | first release 🥳                 |
| 1.0.1                 | small bug fixes 😓 after release |
| 1.1.0                 | add feature XYZ 🤪               |
| 1.1.1                 | bug fixes in feature XYZ 😡      |
| 2.0.0                 | killer feature ZYX released 😍   |
| 2.0.1                 | bug fixes again 😓               |

* ❓ Что такое **MVP?**
* ❓ Что такое **first release?**
* ❓ Что такое **bug fixes?**
* ❓ Что такое **killer feature?**

> Никогда **не перепрыгивай** через мажорные версии!
>
> Если твоя текущая мажорная версия 9 сначала обновись до 10, потом до 11 и т.д.

***

## +3. Работаем ручками

- [x] Открой [инструкцию по миграции](https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-100) на 10 версию.

Читаем документацию и выписываем **чек-лист** по миграции.

### 3.1. Configuration file changes

- [x] Прочитай [заметки](https://docs.cypress.io/guides/references/migration-guide#Configuration-File-Changes) к разделу.

1. Cypress перешел на **конфигурацию на базе Java Script** файла `cypress.config.js`
2. Файл конфигурации `cypress.json` был **удален** и больше не поддерживается.
3. Часть **опций** была **переименована** и **перенесена** в другие разделы.

- [x] Удали файл `cypress.json`

```json
{
    "baseUrl": "https://demo.realworld.io/",
    "chromeWebSecurity": false,
    "defaultCommandTimeout": 10000
}
```

- [x] Создай файл `cypress.config.js`

```js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    defaultCommandTimeout: 10000,
    browser: {
        chromeWebSecurity: false
    },
    e2e: {
        baseUrl: 'https://demo.realworld.io/',
    }
});
```

***

### 3.2. Plugins file removed

- [x] Прочитай [заметки](https://docs.cypress.io/guides/references/migration-guide#Plugins-File-Removed) к разделу.

1. Файл `cypress/plugin/index.js` был **удален** и больше не поддерживается.
2. Необходимо **перенести** код в `cypress.config.js` в раздел `e2e.setupNodeEvents`

- [x] Удали файл `cypress/plugin/index.js`

```js
/// <reference types="cypress" />

module.exports = (on, config) => {
  on('task', {

    // this plugin just for demonstration
    echo: (message) => {
      console.log('echo to Node.js console', message);
      return new Promise((done) => {
        // return message back to browser
        done(message);
      });
    }

  });

};
```


- [x] Перенеси код в `cypress.config.js`

```diff
  e2e: {
+     setupNodeEvents(on, config) {
+
+         on('task', {
+ 
+             // this plugin just for demonstration
+             echo: (message) => {
+                 console.log('echo to Node.js console', message);
+                 return new Promise((done) => {
+                     // return message back to browser
+                     done(message);
+                 });
+             }
+
+         });
+
+     }
```

***

### 3.3. Support file

- [x] Прочитай [заметки](https://docs.cypress.io/guides/references/migration-guide#supportFile) к разделу.
- [x] Переименуй файл `~/cypress/support/index.js` в `~/cypress/support/e2e.js`

***

### 3.4. Updated test file locations

- [x] Прочитай [заметки](https://docs.cypress.io/guides/references/migration-guide#Updated-Test-File-Locations) к разделу.

1. **Файлы тестов** теперь должны лежать в папке `cypress/e2e`
2. Cypress поменял **шаблон имен файлов** тестов на `test_name.cy.js`

- [x] Переименуй папку `cypress/integration` в `cypress/e2e`
- [x] Переименуй файлы `cypress/e2e/*.spec.js` в `cypress/e2e/*.cy.js`

Остальные примечания к выпуску относятся к функциям Cypress которые мы **не использовали** в нашем проекте.

***

## +4. Up версии Cypress

- [x] Найди все выпущенные версии https://www.npmjs.com/package/cypress?activeTab=versions
- [x] Найди минимальную мажорную версию для Cypress 10.
- [x] В файле манифеста `package.json`

```diff
- "cypress": "^9.7.0",
+ "cypress": "10.0.0",
```

* ❓ Что значит `^` в начале номера версии?
* ❓ Почему мы его убрали?
* ❓ А еще есть такой символ `~`, а он что значит?

<details>
    <summary>Если ты на Windows 🙋‍</summary>

<import from="/partials/git_bash.md"></import>
</details>

- [x] Проверь текущий файл манифеста пакета Cypress:

```bash
head -n 5 node_modules/cypress/package.json
```

- [x] Заставь пакетный менеджер загрузить новую версию `npm i`
- [x] Проверь новый файл манифеста пакета Cypress:

```bash
head -n 5 node_modules/cypress/package.json
```

- [x] Проверь, что пакетный менеджер видит нужную версию `npm list`
- [x] Запусти cypress `npx cypress open`
- [x] Прогони тесты в файле `signup.cy.js`
- [x] Прогони этот файл в Headless режиме:

```bash
npx cypress run --spec cypress/e2e/signup.cy.js
```

- [x] Прогони все тесты в Headless режиме.
- [x] Обнови Cypress до последней минорной версии в мажоре 10:

```diff
- "cypress": "~10.0.0",
+ "cypress": "~10.11.0",
```

- [x] Снова прогони все тесты в Headless режиме.

Мы обновляем миноры обычно на шару 😂

Если что-то **упало,** только тогда бежим в **release notes.**

***

## +5. Обновляем Cypress по-няшному

Это ты через 5 минут!

<iframe src="https://giphy.com/embed/sIfLhexLUqwik" 
  width="480" height="281" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

- [x] Инициализируй новый чистый проект `%/projects/cypress/upgrade_cypress_nyan`
- [x] Установи Cypress `npm i cypress@9 --save-dev`
- [x] Повтори все действия из шага — **1. Загружаем проект**
- [x] Повтори все действия из шага — **4. Up версии Cypress**
- [x] Просто запусти `npx cypress open`
- [x] Наслаждайся 🥳

***

## +6. Берем свежак

В текущем проекте:
- [x] Обнови Cypress до 11 по старинке.
- [x] Обнови Cypress до 12 по-няшному.
- [x] Обнови Cypress до **самой свежей версии.**

***

# ❗️❗️ Обрати внимание ❗️❗️ 👆

В 12 версии в Cypress были внесены некоторые изменения. Теперь если мы хотим использовать значение alias на момент его создания нам необходимо объявлять его следующим образом:

```js
.as('username', { type: 'static' })
```
Подробнее об этом можно узнать [в официальной документации](https://docs.cypress.io/api/commands/as#Yields-Icon-namequestion-circle)

***

Та да 🥳 Ты дошел до конца.

# 😭 Домашка

- [ ] Закинь остальные тесты из выполненных тобой туториалов.
- [ ] Проанализируй файл тестов `global-feed.spec.js`
- [ ] Сделай авторизацию везде через API.

* ❓ Что такое `context`?

# 🙏 Фидбек пожалуйста

<import from="/partials/tutorial_feedback.md"></import>
