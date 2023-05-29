<md-hidden>
🛑 Данный туториал отображается на GitHub 🔴 не корректно! Это лишь исходник.<br>
Правильная версия https://www.epic1h.com/deploy_conduit
</md-hidden>

# Туториал: деплоим проект на своем сервере

Подойдет тем, кто хочет научится публиковать проекты используя Docker на своем сервере.

#Docker #DockerSwarm #DockerHub #DockerCompose #Postgres

# 👍 Что сделаем

* Соберем и запустим локально проект платформы для ведения блогов на Docker Swarm.
* Научимся публиковать образ проекта на Docker Hub с нужным тегом.
* Настроим свой сервер у хостинг провайдера через SSH.
* Развернем проект на внешнем IP адресе в Интернет.

# 😍 Живая обратная связь

<import from="/partials/zoom_standups.md"></import>

# 💪 Минутка мотивации

Свой сервер звучит круто! Скоро у тебя будет своя прелесть 🤣

<iframe src="https://giphy.com/embed/JQxvzmyA3bo3e" 
    width="480" height="347" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

***

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

***

❓ Зачем нужен Fork в Git?

```markdown quiz fork_in_git_why
- [ ] Для хранения резервных копий Git-репозитория
- [ ] Для синхронизации разных веток в репозитории
- [x] Для создания независимой копии проекта на GitHub
- [ ] Для создания новой ветки в репозитории Git
```

❓ Какие действия можно выполнить после создания Fork в Git?

```markdown quiz fork_git_then
- [x] Создать Pull Request для предложения изменений в оригинальный репозиторий
- [ ] Удалить оригинальный репозиторий
- [ ] Объединить Fork с оригинальным репозиторием
- [ ] Изменить ветку по умолчанию в Fork
```

* ❓ Что такое клонирование репозитория?

```markdown quiz git_clone_is
- [ ] Добавление новых файлов и папок в репозиторий
- [x] Создание точной копии репозитория на другом компьютере
- [ ] Фиксация изменений в исходных файлах
- [ ] Создание резервной копии рабочей ветки
```

***

## +2. Регистрация на Docker Hub

- [x] Зарегистрируйся на https://hub.docker.com/
- [x] Авторизуйся через терминал:

```bash
docker login --username {qwerty}
```

❗ `{qwerty}` — твой логин на Docker Hub.

```json how-to
{
  "video": "assets/deploy_conduit/docker_login.webm",
  "width": 796,
  "height": 255
}
```

***

❓ Что размещают на Docker Hub?

```markdown quiz why_docker_hub
- [ ] Docker-контейнеры
- [x] Docker-образы
- [ ] Виртуальные машины
- [ ] Базы данных
- [ ] Файлы конфигурации
```

❓ Docker Hub является?

```markdown quiz docker_hub_is
- [ ] Распределенной файловой системой
- [ ] Инструментом для управления ресурсами серверов
- [x] Онлайн-платформой для обмена Docker-образами
- [ ] Сервисом для резервного копирования данных
```

❓ Что можно сделать с помощью Docker Hub?

```markdown quiz what_can_do_docker_hub
- [x] Скачивать и запускать готовые Docker-образы
- [ ] Разрабатывать и тестировать приложения на Docker
- [x] Публиковать собственные Docker-образы
- [ ] Проводить сетевой мониторинг и анализ трафика
```

❓ Какие преимущества предоставляет Docker Hub?

```markdown quiz docker_hub_benefits
- [x] Упрощение процесса развертывания приложений
- [x] Ускорение разработки и тестирования приложений
- [x] Возможность обновления и масштабирования приложений
- [x] Сокращение затрат на IT-инфраструктуру
```

❓ Для чего требуется авторизация?

```markdown quiz why_login_on_docker_hub
- [ ] Что бы скачивать публичные образы
- [x] Что бы загружать свои образы
- [ ] Что бы загружать приватные Docker-образы у других пользователей
- [ ] Что бы использовать теги образов
```

***

## +3. Собираем проект локально

### 3.1. Подготовка бекенда

- [x] Отредактируй файл конфигурации `backend/config/config.js`

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

* ❓ За что отвечают эти настройки?
* ❓ Где храниться пароль для Postgres?
* ❓ Зачем мы удаляем раздел `ssl`?
* ❓ За что отвечают разделы конфигурации `development`, `test` и `production`?

***

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

* ❓ На каком порту будет запущен бекенд <md-placeholder value="80"></md-placeholder> ?
* ❓ За что отвечает флаг `--only=production`?
* ❓ Какой командой мы собираем фронтенд <md-placeholder value="npm -w frontend run build"></md-placeholder> ?

- [x] Создай файл `.dockerignore`

```text
node_modules
```

❓ Зачем Docker что-то игнорировать?

- [x] Собери образ контейнера:

```bash
docker build --build-arg node_evn=production --tag {qwerty}/conduit:1.0.0 .
```

❗ `{qwerty}` — твой логин на Docker Hub.

- [x] Проверь, что образ собран и затегирован с версией `1.0.0`

```bash
docker images
```

```json how-to
{
  "video": "assets/deploy_conduit/build_image.webm",
  "width": 990,
  "height": 300
}
```

* ❓ Что значит собрать образ контейнера?
* ❓ Где хранятся собранные образы?
* ❓ Зачем нужен тег у образа?

***

## +4. Docker оркестрация

- [x] Активируй в Docker **режим роя:**

```bash
docker swarm init
```

❓ Что такое режим роя в Docker?

```markdown quiz docker_hub_benefits
- [ ] Режим работы контейнеров на центральном сервере
- [x] Режим масштабирования и отказоустойчивости сервисов приложений
- [ ] Режим упрощения процесса создания и запуска контейнеров
- [ ] Режим повышения безопасности и изоляции образов
```

* ❓ Что значит оркестрация?
* ❓ Чем данный режим отличается от обычного?

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

❓ Что хранится в секретах?

- [x] Создай вольюмы и зачем они нужны:

```bash
docker volume create pg_data
```

- [x] Проверь вольюмы:

```bash
docker volume ls
docker volume inspect pg_data
```

❓ Что хранится в вольюмах и зачем они нужны?

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

- [x] Проверь, что стек добавлен:

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

***

## +5. Создание базы данных

- [x] Найди ID контейнера для Postgres:

```bash
docker ps --format '{{.Names}}'
```

```text
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

## +8. Покупка сервера

- [x] Зарегистрируй аккаунт у хостинг провайдера [selectel.ru](https://www.selectel.ru)
- [x] Пополни баланс на 500 руб.
- [x] Создай новый сервер на Ubuntu:

<img class="cornered" title="Покупка сервера"
    width="782" height="510" src="assets/deploy_conduit/new_server.webp">

- [x] Выбери параметры сервера 1 vCPU | 1GB RAM | 10 GB SSD:

<img class="cornered" title="?"
    width="622" height="453" src="assets/deploy_conduit/server_cpu_ssd.webp">   

- [x] Проверь параметры сети:

<img class="cornered" title="?"
    width="581" height="388" src="assets/deploy_conduit/server_network.webp"> 

- [x] Сохрани пароль от **root** пользователя:

<img class="cornered" title="?"
    width="333" height="126" src="assets/deploy_conduit/server_ssh.webp">

- [x] Выбери почасовую оплату за сервер:

<img class="cornered" title="?"
    width="913" height="271" src="assets/deploy_conduit/server_cost.webp">

- [x] Дождись создания сервера:

<img class="cornered" title="?"
    width="919" height="120" src="assets/deploy_conduit/server_ip.webp">

- [x] Войди на сервер через SSH:

```json how-to
{
  "video": "assets/deploy_conduit/login_on_server.webm",
  "width": 990,
  "height": 334
}
```

- [x] Подготовь сервер:

```bash
apt-get update
apt-get install docker.io
```

## +9. Публикация проекта

- [x] Активируй на сервере **режим роя** в Docker:

```bash
docker swarm init
```

- [x] Создай на сервере секреты пошагово:

```bash
docker secret ls
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
docker volume ls
docker volume create pg_data
```

- [x] Проверь вольюмы:

```bash
docker volume ls
docker volume inspect pg_data
```

- [x] Установи консольный **текстовый редактор Vim:**

```bash
apt-get -qq install vim
```

- [x] Скопируй в буфер обмена файл `deploy.yml` из проекта.
- [x] Открой редактор на сервере:

```bash
vi deploy.yml
```

- [x] Нажми последовательно:

`i` → `CTRL` + `V` → `ESC` → `:w` → `:q`

- [x] Проверь, что файл появился:

```bash
ls -l
```

```json how-to
{
  "video": "assets/deploy_conduit/vi_deploy.webm",
  "width": 990,
  "height": 334
}
```

- [x] Запуль с Docker Hub нужный образ:

```bash
docker pull {qwerty}/conduit:1.0.0-amd64
```

- [x] Выполни деплой сервисов в стеке `app_blogs`

```bash
VERSION=1.0.0-amd64 docker stack deploy --compose-file deploy.yml app_blogs
```

- [x] Создай базу данных и пользователя пошагово:

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

- [x] Перезапусти сервис `conduit` в стеке `app_blogs`

```bash
docker service update app_blogs_conduit --force
npx -w backend sequelize-cli db:seed:all
```

- [x] Открой `http://{external_ip}/`

# 😭 Домашка

- [ ] Изучи еще полезные Docker команды:

```bash
docker ps
docker stack ls
docker stack rm
docker rmi --force
docker volume rm
docker secret rm
docker system prune --all
```

# 🙏 Фидбек пожалуйста

<import from="/partials/tutorial_feedback.md"></import>