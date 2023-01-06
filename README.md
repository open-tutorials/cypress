<style>
h1 {
  background: #121FCF;
  font-size: 3em;
  background: linear-gradient(to right, #121FCF 0%, #CF1512 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1.title {
  margin-top: 0;
  font-size: 5em;
}

#slide {
  margin-top: 20px;
  padding: 20px 40px;
  background-color: #F1F3FC;
  border-radius: 10px;
}

#slide h1 {
  margin-top: 0;
}

</style>

<h1 class="title">Туториалы<br>по IT навыкам</h1>

```text circle hello_from_anton
{
  "time": 1.7,
  "video": "https://raw.githubusercontent.com/breslavsky/hello-cypress/main/assets/hello_from_anton.mp4"
}

Привет, [Anton](https://t.me/breslavsky_anton) на связи 🤙

Я — Тимлид и **разработчик** с более чем **15-летним** опытом. 

Мне 36, живу и работаю в Берлине, и у меня есть огромное желание **делиться** знаниями.

Я разработал серию практических туториалов по авто-тестам на **Cypress**

Чистый **концентрат** — все как на работе, сразу в бой.

Ну что? Погнали 👇
```

<section id="slide">

# Мой подход

Я сторонник **проблемно-ориентированного** ~~программирования~~ обучения:
1. Выполняя **практические действия** и сталкиваясь с **проблемами** — у тебя возникают вопросы.
2. Получая ответы, ты ловишь **ага-эффекты!** Чем больше таких эффектов — тем большему ты научишься!

На сложные вопросы и **концепты** — я даю свои **расширенные** комментарии.

</section>

# Менторство по Zoom

Каждый вторник и четверг я провожу свои **менторские стендапы** в Zoom для всех желающих.

Подробности и 🔔 анонсы новых туториалов в [Телеграмм](https://t.me/epic_one_hour)

Скринкасты и записи стендапов на 🎬[YouTube](https://www.youtube.com/@epic_one_hour)

# Туториалы по Cypress

<details>
  <summary>Syllabus – учебный план <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M15.826 15.069a1.018 1.018 0 1 1-.001 2.036a1.018 1.018 0 0 1 0-2.036zM21.327 1.11a1.018 1.018 0 1 1 .001 2.036a1.018 1.018 0 0 1 0-2.036zM3.322 3.107h16.116a2.13 2.13 0 0 0 1.89 1.151a2.132 2.132 0 0 0 2.129-2.13A2.131 2.131 0 0 0 21.327 0c-.89 0-1.654.55-1.97 1.329H3.321C1.764 1.329.543 2.51.543 4.019v17.156C.543 22.706 1.816 24 3.322 24h17.155c1.51 0 2.738-1.267 2.738-2.825V10.998c0-1.532-1.228-2.78-2.738-2.78H10.3c-1.553 0-2.866 1.274-2.866 2.78v3.198c0 1.484 1.286 2.691 2.866 2.691h3.554a2.132 2.132 0 0 0 1.972 1.329c1.174 0 2.129-.956 2.129-2.13s-.955-2.129-2.13-2.129a2.13 2.13 0 0 0-1.889 1.152H10.3c-.523 0-1.088-.349-1.088-.913v-3.198c0-.524.519-1 1.088-1h10.177c.538 0 .96.439.96 1v10.177c0 .567-.44 1.047-.96 1.047H3.322c-.533 0-1-.49-1-1.047V4.02c0-.52.43-.912 1-.912"></path></svg></summary>

```mermaid
%%{ init: { 'flowchart': { 'curve': 'monotoneX' } } }%%
flowchart TB
cypress_test_flight(<span style='font-size:25px'>Первый полет</span>)
cypress_test_flight --> node_js(Node.js)
node_js --> package_json(package.json)
node_js --> npm
npm --> npm_init(npm init)
npm --> npm_install(npm install)
node_js --> node_modules
node_js --> npx
npx --> cypress_npx(cypress)
cypress_npx --> cypress_open(open)
cypress_npx --> cypress_run(run)
cypress_test_flight --> cypress(Cypress)
cypress ---> cy_visit(visit)
cypress ---> cy_get(get)
cypress ---> cy_type(type)
cypress ---> cy_click(click)
cypress ---> cy_should(should)
cy_should --> cy_should_have_text(have.text)
cypress_test_flight --> TDD
TDD ---> it

style cypress_test_flight stroke:#333,stroke-width:4px
click cypress_test_flight "https://md.epic1h.com/cypress_test_flight" _blank
click npm_init "https://youtu.be/lqqlaOuxrpM?t=194" _blank
click cy_click "https://youtu.be/lqqlaOuxrpM?t=591" _blank
```

```mermaid
%%{ init: { 'flowchart': { 'curve': 'monotoneX' } } }%%
flowchart TB
best_selectors(<span style='font-size:25px'>Лучшие селекторы</span>)
best_selectors ---> dev_tools(DevTools)

dev_tools --> query_selector_all(querySelectorAll)
dev_tools --> $$($$)

best_selectors --> css_selectors(CSS selectors)
css_selectors --> semantic_ui(Semantic UI)
css_selectors --> data_cy("[data-cy]")

best_selectors --> tiny_web_server(Tiny Web Server)
best_selectors --> wget(Wget)

best_selectors --> js_TODO(TODO)

style best_selectors stroke:#333,stroke-width:4px
click best_selectors "https://md.epic1h.com/best_selectors" _blank
```

```mermaid
%%{ init: { 'flowchart': { 'curve': 'monotoneX' } } }%%
flowchart TB
test_mama_project(<span style='font-size:25px'>Тестируем мама проект</span>)
test_mama_project --> conduit(Conduit)

conduit --> login
conduit --> register
conduit --> logout

test_mama_project --> tdd(TDD)
tdd ---> tdd_describe(describe)
test_mama_project --> java_script("Java Script")

java_script --> js_math(Math)
js_math --> js_random(random)
js_math --> js_round(round)

test_mama_project --> cypress(Cypress)
cypress --> cy_it_only(it.only)
cypress --> cy_url(url)
cypress --> cy_should(should)
cy_should --> cy_include(include)
cy_should --> cy_contain_text(contain.text)
cy_should --> cy_be_visible(be.visible)

style test_mama_project stroke:#333,stroke-width:4px
click test_mama_project "https://md.epic1h.com/test_mama_project" _blank
```

```mermaid
%%{ init: { 'flowchart': { 'curve': 'monotoneX' } } }%%
flowchart TB
my_first_refactor(<span style='font-size:25px'>Мой первый рефактор</span>)


my_first_refactor --> cypress(Cypress)
cypress --> cypress_config(cypress.json)
cypress_config --> base_url(Base URL)

cypress --> hooks
hooks --> before_each(Before Each)
cypress --> aliases
aliases --> as
aliases --> get_alias("@")

cypress --> fixtures
fixtures --> me_user_json(me-user.json)

my_first_refactor --> signup_spec_js(signup.spec.js)
signup_spec_js --> login_me(loginMe)
my_first_refactor --> utils(utils.js)
utils --> get_random_number(getRandomNumber)

style my_first_refactor stroke:#333,stroke-width:4px
click my_first_refactor "https://md.epic1h.com/my_first_refactor" _blank
```

</details>

## 🦸 Путь героя

1. [Первый полет на Cypress](https://md.epic1h.com/cypress_test_flight)
2. [Находим лучшие селекторы](https://md.epic1h.com/best_selectors)
3. [Тестируем мама проект на Cypress](https://md.epic1h.com/test_mama_project)
4. [Мой первый рефактор в Cypress](https://md.epic1h.com/my_first_refactor)
5. [Фейк дата в тестах](https://md.epic1h.com/fake_data)
6. [Как устроен Cypress внутри](https://md.epic1h.com/deep_cypress)
7. [Заканчиваем мама проект](https://md.epic1h.com/finish_mama_project)
8. Интересные кейсы

## 🥷 Путь ниндзя

9. [Тестируем API в Cypress](https://md.epic1h.com/test_api) ~"Черновик"
10.  Обновляем Cypress до 12
11. Собираем проект локально
12. Запускаем тестирование через CI/CD в GitLab
13. Деплоим проект на своем сервере
14. Визуальное тестирование через Cypress

# Ручное тестирование

1. [Ломаем приложение онлайн-банка](https://md.epic1h.com/became_a_tester)
1. [Организуем баг-трекинг в стартапе](https://md.epic1h.com/bug_tracking)
1. [Исследуем баги и пишем профессиональные баг-репорты](https://md.epic1h.com/perfect_bug_reports)

# Менторство

1. [Java Script](https://md.epic1h.com/js_mentor)

# Челленджы

1. [Спасти мир от хакера Hакатика](https://md.epic1h.com/save_the_world)

# Стримы

1. [Стрим-практикум: мемы учат](https://md.epic1h.com/memes_teach)
1. [ИИ решает тестовое задание по QA](https://www.youtube.com/watch?v=NP6LL5e52vU)
