<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/deploy_conduit
</md-hidden>

# Туториал: деплоим проект на своем сервере

Подойдет тем, кто хочет научится публиковать проекты используя Docker на своем сервере.

# 👍 Что сделаем

* Соберем и запустим локально проект платформы для ведения блогов на Docker Swarm.
* Научимся публиковать образ проекта на Docker Hub с нужным тегом.
* Настроим свой сервер на хостинг провайдере через SSH.
* Развернем проект на внешнем IP адресе в Интернет.

# 🔢 Шаги

## +1. Форкаем Conduit

**A.** Если ты проходил туториалы:

* [Собираем Conduit локально](https://www.epic1h.com/build_conduit)
* [Запускаем тестирование через CI/CD](https://www.epic1h.com/cypress_cicd)

- [x] Открой мама проект в VS Code.

**B.** Если нет:

- [x] Сделай форк репозитария [TonyMckes/conduit-realworld-example-app](https://github.com/TonyMckes/conduit-realworld-example-app)
- [x] Клонируй проект на локальный компьютер.
- [x] Открой проект в VS Code.

## +2. Регистрация на Docker Hub

- [x] Зарегистрируйся на https://hub.docker.com/
- [x] Авторизуйся через терминал:

```bash
docker login --username {qwerty}
```

❗ `{qwerty}` — твой логин на Docker Hub.

## +3. Собираем проект локально

### 3.1. Подготовка бекенда

- [x] Поправь файл конфигурации `backend/config/config.js`

```diff
    production: {
      username: process.env.PG_USER,
-     password: process.env.PG_PASSWORD,
+     password: require("fs").readFileSync(process.env.PG_PASSWORD_FILE, "utf8"),
      database: process.env.PG_DATABASE,
      host: process.env.PG_HOST,
      dialect: "postgres",
-     dialectOptions: {
-       ssl: {
-         require: true,
-         rejectUnauthorized: false,
-       },
      },
    },
```

### 3.2. Собираем Docker образ

- [x] Создай файл `Dockerfile`

```text
FROM node:16
ARG node_env
ENV NODE_ENV=$node_env \
    PORT=80
WORKDIR /app
COPY ./ ./
RUN npm ci --only=production
RUN npm -w frontend run build
EXPOSE 80
CMD npm run start -w backend

```

- [x] Создай файл `.dockerignore`

```text
node_modules
```

- [x] Собери образ контейнера:

```bash
docker build --build-arg node_evn=production --tag {qwerty}/conduit:1.0.0 .
```

❗ `{qwerty}` — твой логин на Docker Hub.

- [x] Проверь, что образ собран и затегирован с версией `1.0.0`

```bash
docker images
```

## +4. Docker оркестрация

- [x] Активируй в Docker режим роя:

```bash
docker swarm init
```

- [x] Создай секреты пошагово:

```bash
echo "xxxYYY" | docker secret create db_root_password -
echo "yyyZZZ" | docker secret create db_password -
```

- [x] Проверь секреты пошагово:

```bash
docker secret ls
docker secret inspect db_root_password
docker secret inspect db_password
```

- [x] Создай вольюмы:

```bash
docker volume create pg_data
```

- [x] Проверь вольюмы:

```bash
docker volume ls
docker volume inspect pg_data
```

- [x] Создай файл `deploy.yml`

```yaml
version: "3.9"

secrets:
  db_root_password:
    external: true
  db_password:
    external: true

volumes:
  pg_data:
    external: true

services:
  postgres:
    image: postgres:15.2-bullseye
    secrets:
      - db_root_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_root_password
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 10s
      retries: 15
      start_period: 2s
      timeout: 10s

  conduit:
    image: {qwerty}/conduit:${VERSION}
    links:
      - "postgres:postgres"
    ports:
      - 80:80
    depends_on:
      - postgres
    secrets:
      - db_password
    environment:
      NODE_ENV: production
      JWT_KEY: secret
      PG_HOST: postgres
      PG_USER: conduit
      PG_PASSWORD_FILE: /run/secrets/db_password
      PG_DATABASE: conduit
    healthcheck:
      test: curl --fail http://localhost || exit 1
      interval: 10s
      retries: 15
      start_period: 2s
      timeout: 10s
```

- [x] ❗ Замени в файле `{qwerty}` на твой логин на Docker Hub.
- [x] Сделай деплой сервисов в стеке:

```bash
VERSION=1.0.0 docker stack deploy --compose-file deploy.yml app_blogs
```

- [x] Проверь, что стек появился:

```bash
docker stack ls
```

- [x] Проверь состояние сервисов в стеке:

```bash
docker stack services app_blogs
```

- [x] Проверь состояние и логи сервиса Postgres:

```bash
docker service ps app_blogs_postgres
docker service logs app_blogs_postgres
```

- [x] Проверь состояние и логи сервиса Conduit:

```bash
docker service ps app_blogs_conduit
docker service logs app_blogs_conduit
```

- [x] Открой в браузере http://localhost

## +5. Создание базы данных

- [x] Найди ID контейнера для Postgres:

```bash
docker ps --format '{{.Names}}'
```

```
app_postgres.1.xyz
```

- [x] Подключись к консоли контейнера с Postgres:

```bash
docker exec -it app_blogs_postgres.1.{xyz} /bin/bash
```

❗ `{xyz}` — уникальный идентификатор.

- [x] Переключи текущего пользователя:

```bash
su postgres
```

- [x] Подключись к СУБД через программу клиент:

```bash
psql
```

- [x] Создай пользователя `conduit`

```bash
create user conduit with password 'yyyZZZ';
```

- [x] Проверь, что пользователь появился:

```bash
\du
```

- [x] Создай базу с именем `conduit`

```bash
create database conduit;
```

- [x] Проверь, что база создана:

```bash
\l
```

- [x] Назначь владельцем базы нового пользователя:

```bash
alter database conduit owner to conduit;
```

- [x] Проверь, что владелец назначен:

```bash
\l
```

- [x] Отключись от СУБД:

```bash
\q
```

- [x] Проверь подключение от нового пользователя:

```bash
psql -h localhost -d conduit -U conduit -W
```

❗ Введи пароль `yyyZZZ`

- [x] Выйди из контейнера:

```bash
exit
exit
```

## +6. Наполнение базы

- [x] Перезапусти сервис Conduit:

```bash
docker service update app_blogs_conduit --force
```

- [x] Найди ID контейнера для Conduit:

```bash
docker ps --format '{{.Names}}'
```

- [x] Подключись к консоли контейнера с Conduit:

```bash
docker exec -it app_blogs_conduit.1.{xyz} /bin/bash
```

❗ `{xyz}` — уникальный идентификатор. 

- [x] Заполни базу данных тестовыми данными:

```bash
npx -w backend sequelize-cli db:seed:all
```

- [x] Открой http://localhost/

## +7. Публикация Docker образа

- [x] Собери новый образ `1.0.0-amd64` под архитектуру сервера:

```bash
docker build --platform linux/amd64 -t {qwerty}/conduit:1.0.0-amd64 .
```

- [x] Проверь список образов в локальном Docker репозитарии:

```bash
docker images
```

- [x] Запушь нужный образ:

```bash
docker push {qwerty}/conduit:1.0.0-amd64
```

❗ `{qwerty}` — твой логин на Docker Hub.

- [x] Проверь, что образ опубликован:

https://hub.docker.com/repository/docker/{qwerty}/conduit/general

## +8. Создание сервера

- [x] Закажи сервер 10 GB SSD.
- [x] Подготовь сервер:

```bash
apt-get update
apt-get -qq install docker.io
```

## +9. Публикация проекта

- [x] Активируй в Docker режим роя:

```bash
docker swarm init
```

- [x] Создай секреты пошагово:

```bash
echo "xxxYYY" | docker secret create db_root_password -
echo "yyyZZZ" | docker secret create db_password -
```

- [x] Проверь секреты пошагово:

```bash
docker secret ls
docker secret inspect db_root_password
docker secret inspect db_password
```

- [x] Создай вольюмы:

```bash
docker volume create pg_data
```

- [x] Проверь вольюмы:

```bash
docker volume ls
docker volume inspect pg_data
```

- [x] Загрузи `compose` файл:

```bash
apt-get -qq install vim
vi deploy.yml
```

- [x] Запуль с Docker Hub нужный образ:

```bash
docker pull {qwerty}/conduit:1.0.0-amd64
```

- [x] Выполни деплой сервисов в стеке `app_blogs`

```bash
VERSION=1.0.0-amd64 docker stack deploy --compose-file deploy.yml app_blogs
```

- [x] Создай базу данных и пользователя:

```bash
docker exec -it app_blogs_postgres.1.{xyz} /bin/bash
su postgres
psql
create user conduit with password 'yyyZZZ';
\du
create database conduit;
\l
alter database conduit owner to conduit;
\l
\q
exit
exit
```

- [x] Перезапусти сервисы:

```bash
docker service update app_blogs_conduit --force
npx -w backend sequelize-cli db:seed:all
```