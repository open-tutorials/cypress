- [x] Загугли **cypress changelog**
- [x] Открой release notes для версии [10.0.0](https://docs.cypress.io/guides/references/changelog#10-0-0)

❓ Что такое **Release notes**?

- [x] Найди комментарий ниже:

> Read our Migration Guide which explains some **breaking changes** in more detail.

❓ Переведи комментарий на русский язык.
❓ Что такое **Breaking changes**?
❓ Что такое **Migration guide**?

***

- [x] Открой [инструкцию по миграции](https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-100) на 10 версию.

Читаем документацию и выписываем чек-лист по миграции:

* pluginsFile
* slowTestThreshold
* supportFile
* testFiles → specPattern
* Updated Test File Locations


### Configuration file changes & config option changes

1. Cypress перешел на конфигурацию на базе Java Script файла.
2. Часть опций была переименована и перенесена в другие разделы.

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
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  browser: {
    chromeWebSecurity: false
  },
  e2e: {
    baseUrl: 'https://demo.realworld.io/',
  }
});
```

### Plugins file removed

1. Файл `cypress/plugin/index.js` больше не поддерживается.
2. Необходимо перенести код в `cypress.config.js` &rarr; `e2e.setupNodeEvents`

- [x] Удали файл `cypress/plugin/index.js`

```js
```

- [x] Перенеси код в `cypress.config.js`

* `cypress/support/index.js` &rarr; `cypress/support/e2e.js`
* `cypress/plugins/index.js` &rarr; `cypress.config.js / e2e.setupNodeEvents`