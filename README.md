# MCS

## Список задач
1. ~~(FE) Реализация шаблона с основными типами атрибутов~~
2. ~~(FE) Поддержка шаблоном обработки событий (SHOW, HIDE)~~
3. (FE) Добавление в шаблон кнопок - **Отказались от добавления в шаблон кнопок**
4. (FE/BE) Реализация функционала кнопок
5. **MCS-5** - (BE) Сохранение значений экрана
6. **MCS-6** - (BE) Получение значений экрана
7. **MCS-7** - (BE) Хранение состояния объекта в соответствии с сеансом пользователя
8. **MCS-8** - (BE) Задание сценариев (сценарий - очередность переходов между экранами с изменением состояний атрибутов)
9. **MCS-9** - (BE) Реализация проверки правильности прохождения пользователем сценария после окончания сеанса
10. (FE) Доработка стилей на UI и компонентов
11. **MCS-11** - (FE) Возможность авторизации пользователя и привязки телефона к пользователю
12. ~~**MCS-12** - (FE) Страница сессий~~
13. ~~**MCS-13** - (FE) Переход с reducer на redux~~
14. ~~**MCS-14** - (FE) Добавление роутинга между экранами~~
15. ~~**MCS-15** - (FE) Страница логина~~
16. ~~**MCS-16** - (BE) Разработка структуры эндпоинтов на BE~~
17. **MCS-17** - (BE) Добавление доменки
17. **MCS-18** - (BE) Добавление мапперов domain <-> entity

### Шаблон веб-формы

Для генерации экранов используется шаблон веб-формы, который описывает основные элементы экранов и атрибуты.

Используются следующие типы атрибутов:
```
BOOLEAN - чек-бокс 
DICTIONARY - комбо-бокс (поле с множественным выбором)
TEXT - поле для ввода текстового значения 
```

### События обновления веб-формы

Каждый атрибут на веб-форме имеет значение. 
При изменении этого значения, происходит перерасчет видимости отличных атрибутов



