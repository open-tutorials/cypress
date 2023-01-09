flowchart TB
my_first_refactor(<span style='font-size:25px'>Мой первый рефактор</span>)

my_first_refactor --> cypress(Cypress)
cypress --> cypress_config(cypress.json)
cypress_config --> base_url(Base URL)

cypress --> hooks
cypress --> _find(find)
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
click my_first_refactor "/my_first_refactor" _blank
click base_url "https://youtu.be/RSh1BoIK-3s?t=228" _blank
click before_each "https://youtu.be/RSh1BoIK-3s?t=645" _blank
click as "https://youtu.be/RSh1BoIK-3s?t=1152" _blank
click me_user_json "https://youtu.be/RSh1BoIK-3s?t=1956" _blank
click login_me "https://youtu.be/RSh1BoIK-3s?t=2577" _blank
