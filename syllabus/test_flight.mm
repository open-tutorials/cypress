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
click cypress_test_flight "/cypress_test_flight" _blank
click npm_init "https://youtu.be/lqqlaOuxrpM?t=194" _blank
click cy_click "https://youtu.be/lqqlaOuxrpM?t=591" _blank
