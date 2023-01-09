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
cypress --> it_only(it.only)
cypress --> url
cypress --> should
should --> include
should --> contain_text(contain.text)
should --> be_visible(be.visible)

style test_mama_project stroke:#333,stroke-width:4px
click test_mama_project "/test_mama_project" _blank
