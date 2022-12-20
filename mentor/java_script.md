# Менторство Java Script

Дано — платформа по **изучению языков** программирования — https://exercism.io

> Ничего общего с оккультизмом, exercise — упражнение, а не exorcism.

**Ключевые фичи:**
* Полный **Open Source**, как сама платформа, так и задания.
* Трек по Java Script для усиления скилов по Cypress.
* **Интересные** задания в виде историй и концептов.
* **Авто-проверка** заданий.
* **Бесплатные** менторы.
* Превосходный **UI/UX!**

Нужно приготовиться, к тому, что сайт весь на английском.

Хочешь получить меня как ментора на платформе?

- [x] Начни проходить задания в треке по Java Script.
- [x] Если есть вопросы, сгенерируй ссылку-приглашение.
- [x] Отправь ссылку в мой [комьюнити чат](https://t.me/epic_one_hour_community)

# +Freelancer Rates

https://exercism.org/tracks/javascript/exercises/freelancer-rates

## Стоимость рабочего дня

Дано — **фрилансер 🧑‍💻 Борис** со ставкой 20$ в час.

Найти — **стоимость** 8и часового рабочего дня Бориса.

```js
function dayRate(ratePerHour) { 
  return ratePerHour * 8; 
}
dayRate(20); 
// => 160
```

Обычная математика, ничего сложного.

## Рабочих дней в бюджете

Дано — бюджет 10 000$.

Найти — сколько **целых рабочих** дней мы можем оплатить Борису?

```js
function daysInBudget(budget, ratePerHour) {
  return Math.floor(budget / dayRate(ratePerHour));
  // Math.floor(10000 / 160) = Math.floor(62.5)
}
daysInBudget(10000, 20); 
// => 62
```

## Большие проекты

Дано:
* Проект на 55 дней.
* Фрилансер дает скидку 10% за каждый полный месяц работы с ним.
* В месяце 22 рабочих дня. 
* Оставшиеся дни от неполного месяца, фрилансер считает по своей дневной ставке.

Найти — **стоимость фрилансера** с учетом его скидки.

```js
function priceWithMonthlyDiscount(ratePerHour, numDays, discount) { 
  const numMonths = Math.floor(numDays / 22);
  // numMonths = 2
  const monthlyRate = 22 * dayRate(ratePerHour); 
  // monthlyRate = 3520
  const monthlyDiscountedRate = (1 - discount) * monthlyRate;
  // monthlyDiscountedRate = 0.9 * 3520 = 3168
  const numExtraDays = numDays % 22;
  // numExtraDays = 55 % 22 = 11
  const priceExtraDays = numExtraDays * dayRate(ratePerHour);
  // priceExtraDays = 11 * dayRate(20) = 11 * 160 = 1760
  return Math.ceil(numMonths * monthlyDiscountedRate + priceExtraDays);
  // Math.ceil(2 * 3168 + 1760)
}
daysInBudget(20, 55, 0.1);
// => 8096
```

Код выглядит
* логично
* названия функций и переменных понятны

Но всегда есть, что улучшить!

I only can recommend to create two constants

```js
const WORK_HOURS_IN_DAY = 8;
const DAYS_IN_MONTH = 22;
```

Итоговый код

```js
const WORK_HOURS_IN_DAY = 8;
const DAYS_IN_MONTH = 22;

function dayRate(ratePerHour) { 
  return ratePerHour * WORK_HOURS_IN_DAY; 
}

function daysInBudget(budget, ratePerHour) {
  return Math.floor(budget / dayRate(ratePerHour));
}

function priceWithMonthlyDiscount(ratePerHour, numDays, discount) { 
  const numMonths = Math.floor(numDays / DAYS_IN_MONTH);
  const monthlyRate = DAYS_IN_MONTH * dayRate(ratePerHour); 
  const monthlyDiscountedRate = (1 - discount) * monthlyRate;
  const numExtraDays = numDays % DAYS_IN_MONTH;
  const priceExtraDays = numExtraDays * dayRate(ratePerHour);
  return Math.ceil(numMonths * monthlyDiscountedRate + priceExtraDays);
}
```

Понравилось? Ищи меня в [Telegram](https://t.me/epic_one_hour)