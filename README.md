# Задание Диск

Необходимо реализовать приложение, которое бы позволило хранить файлы, а так же организовывать папочные структуру

Для это необходимо реализовать следующий набор ендпоинтов

- Регистрация
- Авторизация


- Просмотр папки
- Создание папки
- Редактирование папки
- Удаление папки


- Загрузка файла на сервер в определенную папку
- Удаление файла из папки

## Авторизация и Регистрация

При регистрации пользователь вводит логин и пароль. Пароль должен храниться в `хешированном виде`

Авторизация должна присходить посредствами JWT, можно использовать эту [библиотеку](https://www.npmjs.com/package/jsonwebtoken)


## Папки

При создании `нового пользователя` должна создавать корневая папка root для данного пользователя, все остальные папки могут 
находиться либо в ней, либо в дочерних папках

У папки обязательно должны быть поля

    - name - string
    - userId - string (id пользователя)
    - parentId - string (ссылка на родительскую таблицу)

Должна быть возможность изменить название или parentId `(сделать перемещение папки из одной в другую)`

**Необходимо запретить удаление и редактирование root папки**  


## Файлы

Необходимо добавить возможность добавления файла в папку.
Для этого нужно загрузить файл на сервер, а затем сохранить в бд путь до файла на сервере

У файла обязательно должны быть поля

    - name - string
    - filepath - string (пусть до файла на сервере)
    - folderId - string (id папки в которой он находится)

Так же необходимо реализовать удаление файла из бд и с сервера.

**Редактирование реализовывать не нужно**

## Информация к выполнению

Можно использовать либо PostgreSQL или MongoDB. Так же можно использовать любые вспомогательные библиотеки

Необходимо реализовать swagger документацию, для удобной интеграции с API

Так же необходимо настроить CORS политики, для возможности интеграции с API с другого домена

Для реализации приложения рекомендовано использовать [nest.js](https://docs.nestjs.com/), но также можно использовать и express