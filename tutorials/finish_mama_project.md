# Туториал: заканчиваем мама проект

Подойдет тем, кто хочет покрыть тестами целый проект на Cypress и добавить его к себе в портфолио.

# 👍 Что сделаем

* Напишем еще 10+ тестов для приложения блогов.
* Закрепим скилл написания тест-кейсов в Markdown.
* Организуем код на проекте по феншую.
* В качестве бонуса — напишем простой скрипт на bash.

# 🙋‍ Перед началом

* Ты инициализировал чистый **Node.js** проект `%/projects/cypress/finish_mama_project`
* Ты установил Cypress `npm i cypress@9 --save-dev`

# 🔢 Шаги

## 1. Заливаем наработки

Возвращаемся к мама проекту [Conduit](https://demo.realworld.io/)

Как ты помнишь в `README` на [GitHub](https://github.com/gothinkster/realworld) мы нашли [спецификацию на роутинг](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing/) — что дает нам представление о функциональных возможностях приложения.

## 1.1. Создаем `README` для тест-кейсов

**Задача: завершить список функциональных тестов приложения.**

- [x] Создай файл `~/test_cases/README.md`
- [x] Добавь Markdown:

```markdown
This file contains test cases for [Conduit project](https://demo.realworld.io/)

# Sign up
* [x] [register user](register_user.md)
* [x] [login user](login_user.md)
* [x] [logout user](logout_user.md)

# Articles 
* [x] [publish article](publish_article.md)
* [x] [delete article](delete_article.md)
* [x] [edit article](edit_article.md)
* [ ] read article
* [ ] like article
* [ ] global articles feed
* [ ] filter articles by tag

# Commenting
* [ ] add comment
* [ ] delete comment

# Social
* [ ] subscribe to user
* [ ] personal articles feed
* [ ] unsubscribe from user

# User settings
* [ ] edit settings
```

- [x] Открой файл в режиме просмотра.

* ❓ Почему ссылки с `[x]` не открываются?

***

Мы уже разработали часть тестов в прошлых туториалах. Давай доставим этот код в текущий проект.

Все тест-кейсы лежат на [GitHub](https://github.com/breslavsky/hello-cypress/tree/main/test_cases/)

Можно скачать все ручками, но ты же девелопер!

**Задача: скачать [файл register_user.md](https://raw.githubusercontent.com/breslavsky/hello-cypress/main/) автоматически.**

- [x] Установи wget `npm i node-wget --save-dev`

Установим **базовый URL** для загрузки файлов, что бы не повторять его в командах.

- [x] Выполни в терминале:

```bash
BASE_URL=https://raw.githubusercontent.com/breslavsky/hello-cypress/main
```

- [x] Проверь, что переменная окружения установлена:

```bash
echo $BASE_URL
```

❓ Что делает `echo`?

- [x] Проверь, что можешь получить полный URL до файла:

```bash
echo $BASE_URL/test_cases/register_user.md
```

- [x] Загрузи файл `register_user.md`

```bash
npx wget -- -d test_cases/ $BASE_URL/test_cases/register_user.md
```

❓ Что сделал `wget`?

- [x] Проверь, что файл появился в папке `~/test_cases`

Осталось еще 5 файлов и можно повторить команду еще 5 раз, а можно сделать по-модному.

***

### 1.2. Пишем скрипт на bash

- [x] Закинь список файлов в новую переменную:

```bash
FILES=( "login_user.md" "logout_user.md" "publish_article.md" "delete_article.md" "edit_article.md" )
```

- [x] Проверь, что можешь генерировать полный URL до файлов:

```bash
for FILE in "${FILES[@]}"; do echo $BASE_URL/test_cases/$FILE; done
```

- [x] Скачай все файлы одной командой:

```bash
for FILE in "${FILES[@]}"; do npx wget -- -d test_cases/ $BASE_URL/test_cases/$FILE; done
```

- [x] Проверь, что все ссылки в `README` открываются.

***

Тада 🥳 Круто?

❓ Что делает `for ... in ...`?

### 1.3. Заливаем готовые тесты

Так же у нас есть часть готово кода.

- [x] Загрузи файл фикстуры `~/cypress/fixtures/me-user.json`

```bash
npx wget -- -d cypress/fixtures/ $BASE_URL/cypress/fixtures/me-user.json
```

- [x] Загрузи файл с общими функциями `~/cypress/support/shared.js`

```bash
npx wget -- -d cypress/support/ $BASE_URL/cypress/support/shared.js
```

- [x] Загрузи файл c функциями-утилитами `~/cypress/support/utils.js`

```bash
npx wget -- -d cypress/support/ $BASE_URL/cypress/support/utils.js
```

- [x] Загрузи файл тестов входа и регистрации `~/cypress/integration/signup.spec.js`

```bash
npx wget -- -d cypress/integration/ $BASE_URL/cypress/integration/finish_mama_project/signup.spec.js
```

- [x] Загрузи файл теста статей `~/cypress/integration/articles.spec.js`

```bash
npx wget -- -d cypress/integration/ $BASE_URL/cypress/integration/fake_data/articles.spec.js
```

### 1.4. Готовим Cypress

- [x] Обнови файл `~/cypress.json`

```json
{
    "baseUrl": "https://demo.realworld.io/",
    "chromeWebSecurity": false,
    "defaultCommandTimeout": 10000
}
```

- [x] Прогони все тесты `npx cypress run`
- [x] Исправь ошибки в тестах