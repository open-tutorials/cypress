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
cypress/support/shared.js|cypress/support/
cypress/support/utils.js|cypress/support/
cypress/plugins/index1.js|cypress/plugins/index.js

cypress/integration/finish_mama_project/signup.spec.js|cypress/integration/
cypress/integration/finish_mama_project/articles/crud.spec.js|cypress/integration/articles/
cypress/integration/finish_mama_project/articles/global-feed.spec.js|cypress/integration/articles/
cypress/integration/finish_mama_project/commenting.spec.js|cypress/integration/
cypress/integration/finish_mama_project/api.spec.js|cypress/integration/
cypress/integration/finish_mama_project/plugins.spec.js|cypress/integration/
```

- [x] Установи wget `npm i node-wget --save-dev`
- [x] Запусти в терминале:

```bash
export BASE_URL=https://raw.githubusercontent.com/open-tutorials/cypress/main 
node download.js
```

- [x] Проверь, что файлы проекта загрузились.
- [x] Прогони все тесты в Headless режиме.

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

```js
```

- [x] Перенеси код в `cypress.config.js`

```js
```

## [Support file](https://docs.cypress.io/guides/references/migration-guide#supportFile)

- [x] Переименуй файл `~/cypress/support/index.js` в `~/cypress/support/e2e.js`.


### [Updated test file locations](https://docs.cypress.io/guides/references/migration-guide#Updated-Test-File-Locations)

Файл тестов теперь должны быть расположены в папке `cypress/e2e`

- [x] Переименуй папку `cypress/integration` в `cypress/e2e`

Остальные разделы относятся к функциям Cypress которые мы не использовали.