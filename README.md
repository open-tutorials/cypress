# Туториалы по ИТ навыкам

Привет, [Anton](https://t.me/breslavsky_anton) на связи 🤙

Перед тобой 👇 серия практических туториалов по авто-тестам на **Cypress**

Чистый **концентрат** — все как на работе, сразу в бой.

Я — Тимлид и **разработчик** с более чем **15-летним** опытом. 

Мне 36, живу и работаю в Берлине, и у меня есть огромное желание **делиться** знаниями.

# Мой подход

Я сторонник **проблемно-ориентированного** ~~программирования~~ обучения:
1. Выполняя **практические действия** и сталкиваясь с **проблемами** — у тебя возникают вопросы.
2. Получая ответы, ты ловишь **ага-эффекты!** Чем больше таких эффектов — тем большему ты научишься!

На сложные вопросы и **концепты** — я даю свои **расширенные** комментарии.

# +Менторство по Zoom

Каждый вторник и четверг я провожу свои **менторские онлайн стендапы** в Zoom для всех желающих.

Подробности и 🔔 анонсы новых туториалов в [Телеграмм](https://t.me/epic_one_hour)

Скринкасты и записи стендапов на 🎬[YouTube](https://www.youtube.com/@epic_one_hour)

# +Туториалы по Cypress

1. [Первый полет на Cypress](https://md.epic1h.com/cypress_test_flight)
2. [Находим лучшие селекторы](https://md.epic1h.com/best_selectors)
3. [Тестируем мама проект на Cypress](https://md.epic1h.com/test_mama_project)
4. [Мой первый рефактор в Cypress](https://md.epic1h.com/my_first_refactor)
5. [Фейк дата в тестах](https://md.epic1h.com/fake_data)
6. [Как устроен Cypress внутри](https://md.epic1h.com/deep_cypress)
7. [Заканчиваем мама проект](https://md.epic1h.com/finish_mama_project)
8. Тестирование API в Cypress
9. Обновляем Cypress до 12
10. Собираем проект локально
12. Запускаем тестирование по расписанию через CI/CD в GitLab
13. Деплоим проект на своем сервере
14. Визуальное тестирование через Cypress

## Силлабус

> **Syllabus** – учебный план 😂

```mermaid
%%{ init: { 'flowchart': { 'curve': 'monotoneX' } } }%%
flowchart TB
  start(("<span style='font-size:40px'>🥚</span>"))
  subgraph g_cypress_test_flight [ ]
    direction TB
    node_js(Node.js) --> package_json(package.json)
    node_js --> npm
    npm --> npm_init(npm init)
    npm --> npm_install(npm install)
    node_js --> node_modules
    node_js --> npx
    cypress_npx(cypress) --> cypress_open(open)
    cypress_npx --> cypress_run(run)
    cypress_test_flight(<span style='font-size:25px'>Первый полет</span>)
    cypress_test_flight --> node_js
    npx --> cypress_npx
    cypress_test_flight --> cypress
    cypress ---> cy_get("cy.get")
    cypress ---> cy_click("click")
    cypress ---> cy_should("should")
  end
  subgraph g_best_selectors [ ]
      direction TB
      dev_tools(DevTools) --> $$($$)
      dev_tools --> querySelectorAll
      dev_tools --> XHR
      TDD ---> it
      best_selectors(<span style='font-size:25px'>Лучшие селекторы</span>) ---> dev_tools
      best_selectors --> tiny_web_server(Tiny Web Server)
      best_selectors --> wget(Wget)
      best_selectors --> TDD
  end
  start --> g_cypress_test_flight
  g_cypress_test_flight --- finish_cypress_test_flight(("<span style='font-size:40px'>🐣</span>"))
  finish_cypress_test_flight --> g_best_selectors
  g_best_selectors --- finish_best_selectors(("<span style='font-size:40px'>🐥</span>"))

style g_cypress_test_flight stroke-dasharray: 5 5
style g_best_selectors stroke-dasharray: 5 5

style start fill:lightgreen,stroke:#333,stroke-width:4px  
style cypress_test_flight fill:LightCoral,stroke:#333,stroke-width:4px
style finish_cypress_test_flight fill:lightgreen,stroke:#333,stroke-width:4px  

style best_selectors fill:LightCoral,stroke:#333,stroke-width:4px
click cypress_test_flight "https://md.epic1h.com/cypress_test_flight"
click best_selectors "https://md.epic1h.com/best_selectors"
```

# +Туториалы по ручному тестированию

1. [Ломаем приложение онлайн-банка](https://md.epic1h.com/became_a_tester)
1. [Организуем баг-трекинг в стартапе](https://md.epic1h.com/bug_tracking)
1. [Исследуем баги и пишем профессиональные баг-репорты](https://md.epic1h.com/perfect_bug_reports)

# +Менторство

1. [Java Script](https://md.epic1h.com/js_mentor)

# +Челленджы

1. [Спасти мир от хакера Hакатика](https://md.epic1h.com/save_the_world)

# +Стримы

1. [Стрим-практикум: мемы учат](https://md.epic1h.com/memes_teach)
