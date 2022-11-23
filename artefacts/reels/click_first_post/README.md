# Интро

`get` + `should` in Cypress

Case — click on first post from a feed after loading

***

Кейс — переход по первому посту в ленте после загрузки

# Слайд 1

Modern WEB applications are asynchronous

DOM is changing dynamically without HTML page reloading

Retry-ability — base approach to find elements in Cypress

***

Современные WEB приложения асинхронны

DOM меняется динамически без перезагрузки HTML страницы

Поиск элементов через повторные попытки — базовый подход в Cypress

## Анимация

Длится 4 секунды.

# Слайд 2

App is loading posts feed

Приложение загружает список постов

```html
<div class="posts">
    <p>Loading...</p>
    <div class="post"></div>
    <div class="post"></div>
    <div class="post"></div>
    <div class="post"></div>
    <div class="post"></div>
</div>
```

Нужно нарисовать ленту постов со скелетонами имитирующими загрузку.

## Анимация

Длится 4 секунды.

# Слайд 3

Длится 4 секунды.

Waiting when loading indicator will be disappear

Ждем когда сообщение о загрузке исчезнет

```js
A | cy.get('.posts')
B |  .should('not.contain', 'Loading')
  |  .find('.post')
  |  .should('have.length.greaterThan', 0)
  |  .eq(0)
  |  .click();
```

```html
X | <div class="posts">
Y |     <p>Loading...</p>
  |     <div class="post"></div>
  |     <div class="post"></div>
```

## Анимация

1. Таймер в обратную сторону от 4 секунд.
2. A желтым.
2. X желтым.
3. B желтым.
3. Y подчеркивается красной линией.
3. X красным.
4. B красным.
5. Убрать все выделения.
6. Переход к 2.

# Слайд 4

Длится 4 секунды.

Loading is done, but posts are not rendered yet

Загрузка завершена, но посты еще отражены в DOM

```js
  | cy.get('.posts')
  |  .should('not.contain', 'Loading')
A |  .find('.post')
B |  .should('have.length.greaterThan', 0)
  |  .eq(0)
  |  .click();
```

```html
  | <div class="posts">
Y |
Y |  
  | </div>
```

## Анимация

1. Таймер в обратную сторону от 4 секунд.
2. Y желтым.
3. Курсор на A желтым.
3. Курсор перемещается на B.
4. Y красным.
5. Убрать все выделения.
6. Переход к 2.

# Слайд 5

Posts list are rendered

Список постов отражен

```js
  | cy.get('.posts')
  |  .should('not.contain', 'Loading')
  |  .find('.post')
  |  .should('have.length.greaterThan', 0)
A |  .eq(0)
B |  .click();
```

```html
  | <div class="posts">
X |  <div class="post">
X |   <p>Lorem Ipsum is simply dummy text 
X |      of the printing and typesetting industry.</p> 
X |  </div>
  | </div>
```

## Анимация

1. A желтым.
1. X желтым.
2. Клик на X!