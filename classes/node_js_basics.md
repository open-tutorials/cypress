# Как еще запустить Cypress?

```bash
npx cypress
./node_modules/.bin/cypress
ls -l ./node_modules/.bin/cypress
node node_modules/cypress/bin/cypress
```

# Cypress реально написан на JS?
```bash
cat ./node_modules/cypress/lib/cli.js
```
# Как вывести дату в NodeJS?
Создать файл `app.js`
```bash
echo 'console.log(new Date());' > app.js
node app
```
или зайти в интерпретатор напрямую
```bash
node
new Date()
.exit
```
# Как подключать пакеты в коде?
```bash
npm i lodash
```
В пишем код `app.js`
```js
const { uniq } = require("lodash");
const arr = [1, 2, 1, 2, 4, 5];
console.log(uniq(arr));
```
# Откуда береться `cy` в коде?
Это просто ссылка на текущий запущенный экземпляр Cypress.
В JS это можно повторить примерно так:
```js
class Anton {
	hello() {
		cy.debug('hello from Anton');
	}
}

const anton = new Anton();

describe('Функции сайта Cypress', () => {
	it('Подписаться на рассылку', () => {
		anton.hello();
		cy.visit('https://www.cypress.io/');
	});
});
```

# Можно подробнее про support файлы?
Все файлы которые лежат в папке support выполняются перед каждым запуском теста.