# Стрим-практикум: мемы учат

Готов принять вызов? Как насчет запилить что-то прикольное и полезное?

Сегодня мы с нуля, напишем простое **WEB приложение** для изучения английских слов **через мемы.**

# 👍 Что сделаем

Накодим приложение, которое:

1. Показывает **случайно выбранное** английское слово из словаря.
2. Предлагает 5 случайных вариантов **перевода** на русском.
3. Показывает **тематический мем** в качестве подсказки.

Можно учить слова веселее 🥳

<details>
  <summary>Смотри, что у нас получится 👇</summary>

<iframe frameborder="0" src="https://stackblitz.com/edit/meme-for-en?hideDevTools=1&view=preview"
width="600px" height="900px">
</iframe>
</details>

# 🤝 Дисклеймер

* Пишем все на чистом HTML / CSS / Java Script в Web IDE на StackBlitz.
* Пишем по-старому, по-дедовски, без всяких там этих 🫢 главное, что бы все было понятно и работало.
* На StackBlitz, что бы потом сразу пошарить [ссылку](https://stackblitz.com/edit/meme-for-en) на работающий проект.

***

# 🔢 Шаги

И так, с чего начать?

## +1. Прототипирование

### +1.1. Юзер сторис

Ответим на вопросы что, как, пользователь: **Я хочу? Я вижу? Я могу?**

> Пользовательская история, или User Story — это описание функций продукта простым языком.

Как пользователь, **я хочу:**

**1. Загрузить свой словарь для изучения:**

1. Я вижу: текстовое поле для загрузки словаря.
2. Я могу: ввести пары слов в формате английское → русский перевод.
3. Я могу: нажать на кнопку **Начать учиться**.

**2. Учить слово:**

1. Я вижу: случайное слово на английском.
2. Я вижу: 5 предложенных вариантов, включая правильный ответ.
3. Я вижу: тематический мем для английского слова.
4. Я могу: нажать на выбранный вариант.
5. Я вижу: результат ответа: верно или ошибка.
6. Я могу: нажать на кнопку **Следующее слово**

***

### +1.2. Варефреймы

Набросаем схематично на салфетке как это может примерно выглядеть — варефреймы.

У меня получилось 2 экрана.

### Load vocabulary

<img width="320" height="340" src="assets/memes_teach/load_vocabulary.png">

### Learn word

<img width="380" height="510" src="assets/memes_teach/learn_word.png">

Кажется не плохо за 5 минут?

***

## +2. Ресерч

Прежде чем бежать кодить, мы должны ответить на вопросы:

* А мы вообще сможем это сделать?
* Как проще всего это сделать?
* С какими проблемами мы можем столкнуться?

Нужно провести исследование. Пробежимся по каждой фиче.

***

### +2.1. Загрузка словаря

По юзуер-стори и варефрейму фича выглядит несложно.

Пользователю можно предложить загрузить свой словарь в виде текста:

```text
commit>фиксировать
pull>тянуть
push>толкать
merge>соединять
folder>папка
setup>устанавливать
bundle>пакет
implement>реализовывать
allow>разрешать
prohibit>запрещать
persistent>постоянный
layout>макет
introduce>представлять
validation>проверка
template>шаблон
reference>ссылка
exception>исключение
requirement>требование
request>запрос
button>кнопка
network>сеть
perform>выполнять
string>строка
purpose>цель
deny>отказывать
permission>разрешение
column>столбец
solution>решение
settings>настройки
bind>связывать
reset>сбрасывать
mandatory>обязательный
batch>комплектовать
switch>переключать
amount>количество
issue>проблема
bootstrap>загружать
free>свободный
ability>способность
integer>целое число
timestamp>метка времени
assemble>собирать
wrapper>обертка
clause>условие
variable>переменная
example>пример
property>свойство
explanation>объяснение
split>разделять
current>текущий
credentials>учетные данные
```

Предложим ввести ему пары слов в текстовое поле на форме.

Далее преобразуем текст в структуру:

```json
[
  {
    "en": "folder",
    "ru": "папка"
  },
  {
    "en": "property",
    "ru": "свойство"
  }
  ...
]
```

Для этого воспользуемся в Java Script функцией `split()`

***

### +2.2. Изучение слова

Выбирать случайное слово из словаря и случайные варианты перевода нам поможет `Math.random()`

#### Откуда брать мемы?

Немного погуглив я нашел https://giphy.com/

Там есть поиск по словам, а так же можно получить HTML код для вставки.

https://giphy.com/gifs/culture--think-hmm-d3mlE7uhX8KFgEmY

<img width="500" height="247" src="assets/memes_teach/giphy_embed.png">

```html
<iframe id="meme"
        src="https://giphy.com/embed/d3mlE7uhX8KFgEmY"
        width="480"
        height="264"></iframe>
```

Видим, что `src` содержит URL до гифки с мемом. Осталось только понять как **взять** этот URL **программно.**

***

#### Giphy API

Еще немного погуглив я нашел, что Giphy предоставляет доступ по API 🔥

https://developers.giphy.com/docs/api/endpoint#search

Для доступа нужно получить API key — делается в 2 клика [тут](https://developers.giphy.com/dashboard/?create=true)

А потом можно выполнять вот такие HTTP запросы

https://api.giphy.com/v1/gifs/search?api_key=bDCakdbTSXSK6sIeIflTEEywQxSsdEdW&limit=5&q=bla

Параметр `q=` отвечает за передачу поискового запроса в который мы можем поместить наше английское слово.

Ответ мы видим в сыром JSON, я форматнул [тут](https://jsonformatter.curiousconcept.com/) для наглядности.

Что-то мне подсказывает, что это то, что мы ищем.

<img width="600" height="288" src="assets/memes_teach/giphy_json.png">

По сути нам нужно взять `embed_url` первого мема и подсунуть его в свойство `src` фрейма внутри HTML.

Это как говорится, как два пальца:

```js
const memeElement = document.getElementById('meme');
memeElement.setAttribute('src', data[0].embed_url);
```

#### Риски и риски

Получается, для поисках мемов мы используем сторонний сервис Giphy и его API.

Это создает риски:
* Что если, Giphy **закроет** для нас API в будущем?
* Что если, Giphy захочет **брать** с нас **деньги** за использования своего API?

Решить это можно, предварительно **скачав к себе** гифки с Giphy для **всех слов** из английского словаря 😱

Но мы пока колхозим, нам бы вообще хоть что-то сделать и проверить.

***

## +3. Кодим

### Процесс разработки 

1. Разрабатываем MVP — минимальный жизнеспособный продукт, а в народе колхозим.
2. Тестим MVP на пользователях, получаем фидбек, что все кайф или беда.
3. Потом рефакторим — оптимизируем код, делаем красиво внутри.
4. Наводим няшности — делаем красиво снаружи — дизайним.

На стриме мы только колхозим, остальные этапы за тобой! Не забывай использовать тайм-коды.

<iframe width="800" height="450" src="https://www.youtube.com/embed/KapDlFwcHUA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Само приложение с которым можно поиграться https://stackblitz.com/edit/meme-for-en

# To Do

Вот тебе домашка:
- [ ] Брать рандомный мем, а не первый.
- [ ] Показывать количество очков и ошибок.
- [ ] Не повторять предложенные варианты.
- [ ] Не повторять выученные слова.
- [ ] Не давать перейти к следующему слову без ответа.
- [ ] Создай свой [словарь](http://www.itmathrepetitor.ru/anglijjskie-slova-dlya-programmista/)

# Что дальше

- У тебя вопросы?
- Тебе нужна поддержка и мотивация?

Каждый вторник и четверг я провожу стендапы в Zoom со всеми желающими.

Все подробности в Телеграм 👉 https://t.me/epic_one_hour

@[Anton Breslavsky|https://t.me/breslavsky_anton|https://s.epic1h.com/api/public/dl/nfCyhZhd?inline=true]