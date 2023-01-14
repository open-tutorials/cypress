<style>
.tutorials {
  display: grid;
  margin: -10px;
  grid-template-columns: 33% 33% 33%;
}

.card {
  margin: 10px;
  position: relative;
}

.card .progress {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}

.card a {
  display: block;
  border-radius: 5px;
  border: 2px solid silver;
  position: relative;
}

.card a img {
  display: block;
  min-height: 100px;
}

.card a div {
  padding: 5px;
  text-align: center;
}
</style>

```html template
<div class="tutorials">
<% forEach(tutorials, function(t) { %>
  <div class="card">
    <md-progress class="progress" for="${t.slug}"></md-progress>
    <md-link href="${t.slug}">
      <img width="100%" src="${assetsUrl}/${t.thumbnail}/thumbnail.jpg">
      <div>${t.title}</div>
    </md-link>
  </div>
<% }); %>
</div>


{ 
  "assetsUrl": "https://raw.githubusercontent.com/breslavsky/hello-cypress/main/assets",
  "tutorials": [
    { "slug": "cypress_test_flight", "thumbnail": "test_flight", "title": "Первый полет на Cypress" },
    { "slug": "best_selectors", "thumbnail": "best_selectors", "title": "Находим лучшие селекторы" }
  ]
}
```