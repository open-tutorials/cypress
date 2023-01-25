<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/cypress_test_flight
</md-hidden>

# Туториал: первый полет на Cypress

Подойдет тем, кто хочет начать писать автоматизированные тесты.

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/upgrade_cypress`
* Ты установил Cypress `npm i cypress@9 --save-dev`

# 🔢 Шаги

## 1. Загружаем проект

- [x] Создай скрипт загрузки файлов проекта `download.js` с [содержимым](/download.js)
- [x] Создай файл `mama_files.txt` со списком загрузки:

```text
cypress/fixtures/me-user.json|cypress/fixtures/

cypress/support/index.js|cypress/support/
cypress/support/commands.js|cypress/support/
cypress/support/shared2.js|cypress/support/|shared.js
cypress/support/utils.js|cypress/support/
cypress/plugins/index1.js|cypress/plugins/|index.js

cypress/integration/upgrade_cypress/signup.spec.js|cypress/integration/
cypress/integration/upgrade_cypress/articles/crud.spec.js|cypress/integration/articles/
cypress/integration/upgrade_cypress/articles/global-feed.spec.js|cypress/integration/articles/
cypress/integration/upgrade_cypress/commenting.spec.js|cypress/integration/
cypress/integration/api.spec.js|cypress/integration/
cypress/plugins.spec.js|cypress/integration/
cypress.json|./
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

</details>

## 3. Читаем примечания к выпуску

- [x] Загугли **cypress changelog**
- [x] Открой release notes для версии [10.0.0](https://docs.cypress.io/guides/references/changelog#10-0-0)

* ❓ Что такое **Changelog?**
* ❓ Что такое **Release notes?**
* ❓ Когда эта версия была выпущена — <md-placeholder value="6/1/2022"></md-placeholder>

- [x] Найди комментарий ниже:

> Read our **Migration Guide** which explains some **breaking changes** in more detail.

- [x] Переведи комментарий на русский язык.

* ❓ Что такое **Migration guide**?
* ❓ Что такое **Breaking changes**?

- [x] Открой [инструкцию по миграции](https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-100) на 10 версию.

Читаем документацию и выписываем чек-лист по миграции.

### [Configuration file changes](https://docs.cypress.io/guides/references/migration-guide#Configuration-File-Changes)

1. Cypress перешел на конфигурацию на базе Java Script файла `cypress.config.js`
2. Файл конфигурации `cypress.json` был удален и больше не поддерживается.
3. Часть опций была переименована и перенесена в другие разделы.

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

### [Plugins file removed](https://docs.cypress.io/guides/references/migration-guide#Plugins-File-Removed)

1. Файл `cypress/plugin/index.js` бы удален и больше не поддерживается.
2. Необходимо перенести код в `cypress.config.js` &rarr; `e2e.setupNodeEvents`

- [x] Удали файл `cypress/plugin/index.js`
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

## [Support file](https://docs.cypress.io/guides/references/migration-guide#supportFile)

- [x] Переименуй файл `~/cypress/support/index.js` в `~/cypress/support/e2e.js`.

### [Updated test file locations](https://docs.cypress.io/guides/references/migration-guide#Updated-Test-File-Locations)

1. Файл тестов теперь должны быть расположены в папке `cypress/e2e`
2. Cypress поменял шаблон имен файлов тестов на `test_name.cy.js`

- [x] Переименуй папку `cypress/integration` в `cypress/e2e`
- [x] Переименуй файлы `cypress/e2e/*.spec.js` в `cypress/e2e/*.cy.js`


Остальные разделы относятся к функциям Cypress которые мы не использовали.

## 4. Обновление Cypress

Никогда не перепрыгивай через версии!

Если твоя текущая мажорная версия 9 сначала обновись до 10, потом до 11 и т.д.

- [x] На все выпущенные версии https://www.npmjs.com/package/cypress?activeTab=versions
- [x] Найди минимальную мажорную версию для 10.
- [x] В файле манифеста `package.json`

```diff
- "cypress": "~9.7.0",
+ "cypress": "~10.0.0",
```

- [x] Проверь текущий файл манифеста пакета Cypress:

```bash
head -n 5 node_modules/cypress/package.json
```

- [x] Заставь пакетный менеджер загрузить новую версию:

```bash
npm i
```

- [x] Проверь новый файл манифеста пакета Cypress:

```bash
head -n 5 node_modules/cypress/package.json
```

- [x] Проверь, что пакетный менеджер видит нужную верси
```bash
npm list
```

- [x] Запусти cypress `npx cypress open`
- [x] Прогони тесты в файле `signup.cy.js`
- [x] Прогони этот файл в Headless режиме:

```bash
npx cypress run --spec cypress/e2e/signup.cy.js
```

- [x] Прогони все тесты в Headless режиме.
- [x] Обнови Cypress до последней минорной версии в мажоре 10:

`major.minor.build = 10.?.?`

```diff
- "cypress": "~10.0.0",
+ "cypress": "~10.11.0",
```

