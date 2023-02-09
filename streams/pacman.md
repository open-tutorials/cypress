# Стрим-практикум: обещание Пакмана

Подойдет тем, кто хочет понять что такое **промисы** и **асинхронное** программирование.

# 👍 Что сделаем

1. Заставим Пакмана **синхронно** добраться до яблока.
2. Перепишем код на асинхронные **промисы.**
3. Создадим **Пакман бота!**

Готов принять вызов и понять **обещание Пакмана?**

# 💪 Минутка мотивации

Помнишь как этот парень пел — **Я есть Пакман!?**

Ты будешь петь так же когда пройдешь туториал до конца 🤣

<iframe width="560" height="315" 
src="https://www.youtube.com/embed/Hy8kmNEo1i8?start=5.5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 🔢 Шаги

## +1. Форкаем Пакмана

- [x] Открой мой [проект на StackBlitz](https://stackblitz.com/edit/promise-pacman?file=index.html)
- [x] Нажми в меню сверху **Fork.**


* ❓ Что такое **StackBlitz**?
* ❓ Что такое **Fork**?

## +2. Синхронный Пакман

* [x] Обнови код в `index.html` вместо `// your code here`

```js
console.log('start');
const anton = new PacMan(20, 20);
anton.run(2);
anton.turnRight();
anton.run(5);
anton.turnRight();
anton.run(2);
anton.turnLeft();
console.log('finish');
```

* ❓ Как зовут твоего Пакмана?
* ❓ Что значит `new`?
* ❓ Что за магические числа `(20, 20)`?
* ❓ Что делает метод `run(n)`?
* ❓ Что делают методы `turnRight()` и `turnLeft()`?

***

- [x] Заставь **Антона** дойти до яблока.
- [x] Назови Пакмана своим именем.
- [x] Открой консоль и проверь вывод сообщений `start` & `finish`

***

## +3. Асинхронный Пакман

В синхронном программировании:

```js
1: A()
2: B()
3: C()
4: D()
```

Все команды выполняться последовательно: `A` &rarr; `B` &rarr; `C` &rarr; `D`

В асинхронном:

```js
1: A().then(() => { })
2: B().then(() => { })
3: C().then(() => { })
4: D().then(() => { })
```

Все команды `A`, `B`, `C`, `D` выполнятся одновременно.

- [x] Обнови код функции `runPacMan()`

```js
console.log('start');
const anton = new PacMan(20, 20);
anton.runWhileCan().then(() => {
    anton.turnRight();
    anton.runWhileCan().then(() => {
        anton.turnRight();
        anton.runWhileCan().then(() => {
            anton.turnLeft();
        });
    });
});
console.log('finish');
```

* ❓ Что такое `runWhileCan()`?
* ❓ Чем отличается метод `runWhileCan()` от `run(n)`?
* ❓ Что возвращает `runWhileCan()`?
* ❓ Почему нам не нужен `then` для `turnRight` и `turnLeft()`?
* ❓ Почему сообщение `finish` выводиться не дожидаясь Пакмана?

## +4. Пакман бот

- [x] Обнови код функции `runPacMan()`

```js
console.log('start');
const boris = new PacMan(0, 120);
let walked = 0;
const runBot = () => {
    boris.runWhileCan().then(({ steps, finish }) => {
    walked += steps;
    const rnd = Math.round(Math.random() * 10);
    if (!finish) {
        if (rnd % 2 > 0) {
        boris.turnRight();
        } else {
        boris.turnLeft();
        }
        runBot();
    } else {
        console.log('finish with', walked, 'steps');
    }
    });
};
runBot();
```

* ❓ Что находится внутри `rnd`?
* ❓ Что вернет `7 % 2`, а `8 % 2`?
* ❓ За что отвечает `finish` в `then`?
* ❓ Какая функция в коде вызывать сама себя?

- [x] Вызови `runPacMan()` 2 раза:

```js
runPacMan();
runPacMan();
```

* ❓ Сколько теперь Пакманов ты видишь?
* ❓ Смог бы ты без ассинхронного программирования запустить много Пакманов?

## +5. Эвейт & асинк

Как тебе такой код? Нравится?

```js
console.log('start');
promise1().then(() => {
    promise2().then(() => {
        promise3().then(() => {
            promise4().then(() => {
                promise5().then(() => {
                    console.log('finish');
                });
            });
        });
    });
});
```

А, что если можно так?

```js
console.log('start');
await promise1();
await promise2();
await promise3();
await promise4();
await promise5();
console.log('finish');
```
- [x] Перепиши код бота:

```js
console.log('start');
const boris = new PacMan(0, 120);
let walked = 0;
const runBot = async () => {
    const { steps, finish } = await boris.runWhileCan();
    walked += steps;
    const rnd = Math.round(Math.random() * 10);
    if (!finish) {
        if (rnd % 2 > 0) {
            boris.turnRight();
        } else {
            boris.turnLeft();
        }
        runBot();
    } else {
        console.log('finish with', walked, 'steps');
    }
};
runBot();
```

* ❓ Что такое `await`?

## +6. Очередь обещаний

Я обещаю обещать и обещаю, что буду обещать!

- [x] Обнови код `runPacMan`

```js
console.log('start');
const wrap = (func) =>
    new Promise((done) => {
        func();
        done();
    });
const boris = new PacMan(20, 20);
const queue = [];

queue.push(() => boris.runWhileCan());
queue.push(() => wrap(() => boris.turnRight()));
queue.push(() => boris.runWhileCan());

let step = 0;
const process = () => {
    const promise = queue[step];
    promise().then(() => {
        step += 1;
        if (step < queue.length) {
            process();
        } else {
            console.log('finish');
        }
    });
};
process();
```

* ❓ Что такое `queue`?
* ❓ Что такое `wrap`?

- [x] Добавь в очередь команд, что бы Пакман нашел яблоко.

# 🙏 Фидбек пожалуйста

<import from="/partials/tutorial_feedback.md"></import>