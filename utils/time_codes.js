const codes = `11:22 С чего начинать тестирование нового проекта?
15:22 Как определить состав фичей на проекте?
16:06 Что такое роутинг на фронтенде?
18:31 Как писать тест-кейсы в Markdown?
22:29 Как связать тест-кейс с кодом?
34:28 Как сгенерировать целое случайное число в Java Script?
37:10 Как запустить только один тест в Cypress?
41:58 Что такое README файлы?
43:10 Как не повторять шаги в тест-кейсах?
44:25 Как не дублировать код в авто-тестах?
58:49 Как добавить текущую дату к любой строке?
01:02:43 Как проверить что Markdown отображается корректно?
01:15:58 Что значит не правильный селектор?
01:21:59 Где использовать регулярные выражения в тестах?
01:23:29 Почему тесты должны быть изолированы друг от друга?
01:32:28 Какие частые ошибки у начинающих авто-тестировщиков?
01:35:39 Что такое цепочка поиска элементов?
01:39:23 Почему не получается запустить Java Script файл в Node.js?`;

const VIDEO_ID = 'TD1X0-JB_Fs';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;

const chapters = codes.split("\n");
for (const chapter of chapters) {

    const match = chapter.match(/([\d]{2}\:)*([\d]{2})\:([\d]{2})\s(.+)/);
    if (!!match) {
        const [, h, m, s, text] = match;

        const hours = !!h ? parseInt(h) : 0;
        const minutes = parseInt(m);
        const seconds = parseInt(s);

        const time = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;

        console.log(`1. [${text}](https://www.youtube.com/watch?v=${VIDEO_ID}&t=${time}&list=PL1W_vbf7JRLDqwf56BkD44yGYbtDaK9Ak)`);
    }
}