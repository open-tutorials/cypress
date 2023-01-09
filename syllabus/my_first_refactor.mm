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
