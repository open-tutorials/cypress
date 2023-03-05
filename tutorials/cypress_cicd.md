<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/cypress_cicd
</md-hidden>

# Туториал: запускаем тесты через CI/CD

Подойдет тем, кто хочет научится запускать тесты на Cypress автоматически через CI/CD на GitHub.

# 👍 Что сделаем

* Опишем сервисы проекта: **фронтенда** / **бекенда** / **БД** для Docker.
* Напишем **API бекенда** для сброса базы данных перед прогоном тестов.
* Научимся **отправлять изменения** в проекте на GitHub.
* Запустим тесты на **CI/СD** GitHub 🔥

# 😍 Живая обратная связь

<import from="/partials/zoom_standups.md"></import>

# 💪 Минутка мотивации

То, что ты сделаешь сегодня — считай **квинтэссенция** твоего пути **ниндзя 🥷** в авто-тестах.

Это просто взорвет твой мозг от крутизны увиденного 🤣

<iframe src="https://giphy.com/embed/v0IfBMXlBqyIM" 
    width="480" height="331" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

# 🙋‍ Перед началом

* Ты прошел предыдущий туториал [собираем Conduit локально](@build_conduit)
* Ты открыл Visual Code в папке `conduit-realworld-example-app`

***

# 🔢 Шаги

## +1. Тестовое окружение

- [x] Обнови файл `~/backend/config/config.js`

```js
test: {
    username: "postgres",
    password: "zyxxyz",
    database: "conduit",
    host: "postgres",
    dialect: "postgres"
}
```

- [x] Обнови манифест бекенда `~/backend/package.json`

```diff
- "start": "NODE_ENV=production node index.js",
+ "start": "node index.js",
```

* ❓ За что отвечают эти настройки?
* ❓ Кто использует этот файл и зачем?
* ❓ За что отвечают другие разделы **development** и **production**?

***

## +2. Докер компоуз

<mark>Задача подготовить набор сервисов (контейнеров) проекта для **деплоя** на любом сервере.</mark>

**Дисклеймер!** Все файлы конфигурации ниже были написаны **опытным DevOps инженером.**

Вот этот парень @[Stanislav Lapshin|https://t.me/slapshin|assets/stas.jpg]

- [x] Создай файл `~/Dockerfile` для сборки фронтенда и бекенда:

```text
FROM node:16
ENV NODE_ENV=test \
    PORT=80
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm -w frontend run build
EXPOSE 80
CMD npx -w backend sequelize-cli db:create; npm run start -w backend
```

- [x] Создай файл `~/.dockerignore`

```text
node_modules
```

- [x] Собери образ будущего контейнера:

```bash
docker build ./
```

- [x] Создай файл `~/docker-compose.yml` для описания сервисов проекта:

```yaml
version: "3.9"

services:
  postgres:
    image: postgres:15.2-bullseye
    environment:
      - POSTGRES_PASSWORD=zyxxyz
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  conduit:
    build: .
    ports:
      - 8080:80
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      - NODE_ENV=test
      - JWT_KEY=secret
    healthcheck:
      test: curl --fail http://localhost || exit 1
      interval: 5s
      retries: 5
      start_period: 2s
      timeout: 10s

  cypress:
    image: cypress/included:12.5.1
    depends_on:
      conduit:
        condition: service_healthy
    environment:
      - CYPRESS_baseUrl=http://conduit:80
    working_dir: /e2e
    volumes:
      - ./cypress.config.js:/e2e/cypress.config.js
      - ./cypress:/e2e/cypress
```

- [x] В терминале **запусти** контейнеры для сервисов:

```bash
docker-compose up
```

- [x] Проверь, что тест 🔴 провален.
- [x] Посмотри видео прогона теста `~/cypress/videos`
- [x] Открой в Chrome http://localhost:8080/

* ❓ Что такое Deploy?
* ❓ Зачем нужен файл `.dockerignore`?
* ❓ Где сейчас запущен Back-End?
* ❓ Где сейчас запускался Cypress?
* ❓ Какой базовый URL использовал Cypress?

***

## +2. RPC сервер

- [x] Останови контейнеры `CTRL` + `C` в терминале.
- [x] Обнови бекенд `~/backend/index.js`

```diff
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      // await sequelize.authenticate();
    } catch (error) {
      console.error(error);
    }
  })();

+ // RPC for Cypress
+ if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
+   const { exec } = require("child_process");

+   function runInShell(command) {
+     const shell = exec(command);
+     let stdout = '', stderr = '';
+     shell.stdout.on("data", data => stdout += data);
+     shell.stderr.on("data", data => stderr += data);
+     return new Promise((done, err) => {
+       shell.addListener("close", code => {
+         console.log("done", code, stdout, stderr);
+         if (code === 0) {
+           done(stdout);
+         } else {
+           err(stderr);
+         }
+       });
+     });
+   }

+   app.post("/api/db/undo", async (req, res) => {
+     runInShell("npx sequelize-cli db:seed:undo:all")
+       .then(out => res.status(200).send(out))
+       .catch(err => res.status(500).send(err));
+   });

+   app.post("/api/db/seed", (req, res) => {
+     runInShell("npx sequelize-cli db:seed:all")
+       .then(out => res.status(200).send(out))
+       .catch(err => res.status(500).send(err));
+   });
+ }

- if (process.env.NODE_ENV === "production") {
+ if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
    app.use(express.static("../frontend/build"));
  } else {
    app.get("/", (req, res) => res.json({ status: "API is running on /api" }));
  }
```

- [x] Обнови хуки `before` в файлах тестов:

```diff
  before(() => {
-     cy.exec('npx -w backend sequelize-cli db:seed:undo:all')
-         .its('code').should('eq', 0);   
+     cy.request({ method: 'POST', url: '/api/db/undo' })
+         .its('status').should('eq', 200);
-     cy.exec('npx -w backend sequelize-cli db:seed:all')
-         .its('code').should('eq', 0);
+     cy.request({ method: 'POST', url: '/api/db/seed' })
+         .its('status').should('eq', 200);
+ });
```

- [x] Пересобери и запусти снова все сервисы:

```bash
docker-compose up --build
```

- [x] Проверь, что тест 🟢 проходит.
- [x] Посмотри видео прогона теста `~/cypress/videos`

<iframe src="https://giphy.com/embed/Y9pvW54NNPRacOKg2D" 
    width="480" height="318" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

* ❓ Что такое RPC?
* ❓ Где теперь выполняются команды сброса и заполнения БД?
* ❓ Зачем нужен параметр `--build`?

***

## +3. Запускаем тесты на GitHub

- [x] Обнови файл `.gitignore`

```diff
  yarn-error.log*

+ cypress/videos
+ cypress/screenshots
```

- [x] Создай файл `.github/ci-cd.yml`

```yml
name: CI/CD
on: [pull_request, push]
jobs:
  test:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build & Test
        run: docker compose up --exit-code-from cypress

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: artifacts
          path: |
            cypress/videos/
            cypress/screenshots/
```

- [x] Проверь статус локального Git репозитория:

```bash
git status
```

- [x] Добавь в Git все файлы для фиксации изменений:

```bash
git add *
```

- [x] Скрытые файлы и папки нужно добавлять отдельно:

```bash
git add .gitignore .dockerignore .github/ci-cd.yml
```

- [x] Снова проверь статус:

```bash
git status
```

- [x] Зафиксируй изменения в репозитории:

```bash
git commit -m "Run CI/CD on GitHub"
```

- [x] Снова проверь статус:

```bash
git status
```

- [x] Отправь изменения на удаленный репозиторий на GitHub:

```bash
git push
```

- [x] Проверь свой коммит на GitHub.

<video class="how-to" width="974" height="597" loop autoplay muted>
    <source src="assets/cypress_cicd/check_commit.webm" type="video/webm">
</video>

* ❓ Зачем нужен файл `.gitignore`?
* ❓ Зачем мы обновляли этот файл?
* ❓ Что такое коммит?
* ❓ Что такое пуш?
* ❓ Что такое локальный и удаленный репозиторий?

***

## +4. Проверка статуса джобы

- [x] Зайди на GitHub в раздел <img class="cornered" title="GitHub actions" width="100" height="33" src="assets/github_actions.webp">
- [x] Открой текущую джобу.
- [x] Проверь лог выполнения.

<video class="how-to" width="1063" height="586" loop autoplay muted>
    <source src="assets/cypress_cicd/check_job.webm" type="video/webm">
</video>

* ❓ Кто запустил эту задачу тестирования?
* ❓ Что сейчас происходит в этой задаче?

***

## +5. Поломка теста

- [x] Сломай намеренно тест `~/cypress/e2e/signup.cy.js`

```diff
- cy.get('.auth-page').as('registerPage');
+ cy.get('.auth-page').as('signupPage');
```

- [x] Закоммить и отправь изменения **(команда за командой):**

```bash
git status
git add *
git status
git commit -m "Break signup test for testing CI/CD"
git push
```

- [x] Снова найди джобу на GitHub.
- [x] Дождись выполнения и сообщения в логах об ошибке.
- [x] Проверь сообщение на почте об ошибке (может прийти с задержкой ~10 минут).
- [x] Скачай артефакты задачи.

<img class="cornered" title="Загрузить артефакты с GitHub"
    width="800" height="578" src="assets/cypress_cicd/download_artefacts.webp">

- [x] Посмотри видео прогона теста из артефактов.
- [x] Исправь тест обратно.

* ❓ Что такое артефакты?

***

Та да 🥳 Ты дошел до конца.

# Читать и смотреть

* [Git для чайников](https://www.youtube.com/watch?v=PEKN8NtBDQ0)
* [GitHub для самых маленьких](https://www.youtube.com/watch?v=Rke_Z1-nvUM)

# 😭 Домашка

- [ ] Напиши тесты используя **best practices:**
  * Публикации статьи.
  * Удаления статьи.
  * Редактирования статьи.
  * Добавление комментария к статье.
  * Удаление комментария.
- [ ] Изучи исходный код файлов в папке `~/backend/seeders`
- [ ] Сделай запросы в базу данных:
  * Вывод списка пользователей.
  * Вывод всех статей.
  * Вывод всех комментариев.
  * Вывод всех тегов.
- [ ] Прогони все тесты на CI/CD.


# 🙏 Фидбек пожалуйста

<import from="/partials/tutorial_feedback.md"></import>