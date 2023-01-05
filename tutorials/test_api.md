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


### +1.2. Играемся в Swagger UI

- [x] В Swagger UI найди эндпоинт `GET /articles`
- [x] Нажми **Try it out**
- [x] Потом нажми **Execute**

<img alt="Как использовать Swagger" 
     width="800" src="assets/test_api/try_swagger_ui.gif">

* ❓ Что произошло?
* ❓ Что ты видишь на экране?
* ❓ Что такое эндпоинт?
* ❓ Что такое **Request URL**?
* ❓ Что такое **Curl**?

***

- [x] Открой в новой вкладке браузера https://api.realworld.io/api/articles?limit=20&offset=0
- [x] Выполни данный запрос в Postman.

* ❓ За что отвечают параметры `limit=20` и `offset=0`?

https://www.chaijs.com/api/bdd/
