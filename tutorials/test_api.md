# Туториал: тестируем API в Cypress

Подойдет тем, кто хочет научиться выполнять HTTP запросы в Cypress.

# 👍 Что сделаем

* Научимся использовать Swagger и Postman.
* Научимся тестировать ответы от API бекенда в Cypress.
* Научимся делать логин пользователя через API.

***

# 🔢 Шаги

## +1. API мамы

### +1.1. Ищем спецификацию

Да да, и снова твой любимый [Conduit](https://demo.realworld.io/)

- [x] Открой проект на [GitHub](https://github.com/gothinkster/realworld)
- [x] Найди ссылку на спецификацию: **View our starter guide & spec**
- [x] В спецификации перейди в раздел: **Frontend → API**
- [x] В документе найди раздел: **Swagger documentation**
- [x] Открой Swagger UI [https://api.realworld.io/api-docs](https://api.realworld.io/api-docs)

* ❓ Что такое Swagger?
* ❓ Что такое Swagger UI?
* ❓ Зачем нужна спецификация на API?

***

### +1.2. Играемся в Swagger UI

- [x] В Swagger UI найди эндпоинт `GET /articles`
- [x] Нажми **Try it out** и **Execute**

<details>
  <summary>Вот так вот 📹</summary>

<img class="cornered" alt="Как использовать Swagger" 
     width="800" height="354" src="assets/test_api/try_swagger_ui.gif">
</details>

* ❓ Что произошло?
* ❓ Что ты видишь на экране?
* ❓ Что такое эндпоинт?
* ❓ Что такое **Request URL**?
* ❓ Что такое **Curl**?

***

- [x] Открой в новой вкладке браузера https://api.realworld.io/api/articles?limit=20&offset=0
- [x] Выполни данный запрос в Postman.

<details>
  <summary>Вот так вот 🖼️</summary>

<img class="cornered" alt="GET запрос в Postman" 
     width="800" height="637" src="assets/test_api/xhr_in_postman.png">

</details>

* ❓ За что отвечают параметры `limit=20` и `offset=0`?

***

- [x] Открой https://demo.realworld.io/
- [x] Найди запрос на этот эндпоинт в инструментах разработчика.

<details>
  <summary>Вот так вот 🖼️</summary>

<img class="cornered" alt="XHR запрос в Dev Tools" 
     width="800" height="361" src="assets/test_api/xhr_in_dev_tools.png">

</details>

* ❓ Что ты видишь на экране?
* ❓ Где эти данные отражаются на сайте?

***

## Контракты на API

https://github.com/gothinkster/realworld/blob/main/api/openapi.yml

https://editor.swagger.io/

https://www.chaijs.com/api/bdd/

