flowchart TB
fake_data(<span style='font-size:25px'>Фейк дата в тестах</span>)
fake_data --> faker

fake_data --> cypress(Cypress)
cypress --> g_should

subgraph g_should [" "]
    direction LR
    should --> contain_text(contain.text)
    should --> contain_html(contain.html)
    should --> have_class_(have.class)
    should --> have_length(have.length)
    should --> have_length_greater_than(have.length.greaterThan)
end

cypress --> parents

fake_data --> shared_js(shared.js)
shared_js --> login

fake_data --> g_articles_spec_js

subgraph g_articles_spec_js [" "]
    direction LR
    articles_spec_js(articles.spec.js)
    articles_spec_js --> generate_fake_article(generateFakeArticle)
    articles_spec_js --> fill_article(fillArticle)
    articles_spec_js --> check_article(checkArticle)
    articles_spec_js --> add_article(addArticle)
    articles_spec_js --> open_my_articles(openMyArticles)
    articles_spec_js --> open_my_article(openMyArticle)
    articles_spec_js --> clear_article(clearArticle)
end

style fake_data stroke:#333,stroke-width:4px
click fake_data "/fake_data" _blank
