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
click best_selectors "/best_selectors" _blank
click query_selector_all "https://youtu.be/tK2F2wNvcWI?t=1853" _blank
click $$ "https://youtu.be/tK2F2wNvcWI?t=1764" _blank
click semantic_ui "https://youtu.be/tK2F2wNvcWI?t=2000" _blank
click tiny_web_server "https://youtu.be/tK2F2wNvcWI?t=610" _blank
click wget "https://youtu.be/tK2F2wNvcWI?t=1025" _blank
click js_TODO "https://youtu.be/tK2F2wNvcWI?t=3058" _blank
