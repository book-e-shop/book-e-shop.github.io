# Лабораторная работа 5. Реализуем интерфейс управления данными. CRUD 2 связанных таблиц полностью

## Структура данных

<img  src = "img/lab5/db.png">


## Все модульные сетки, учитывая второй объект

#### Главная страница

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FW7G5HRGOIMFjztg6a4tz3D%2F%25D0%259A%25D0%25BD%25D0%25B8%25D0%25B6%25D0%25BD%25D1%258B%25D0%25B9-%25D0%25BC%25D0%25B0%25D0%25B3%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BD%3Fnode-id%3D9%253A7&chrome=DOCUMENTATION" allowfullscreen></iframe>

#### Каталог

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FW7G5HRGOIMFjztg6a4tz3D%2F%25D0%259A%25D0%25BD%25D0%25B8%25D0%25B6%25D0%25BD%25D1%258B%25D0%25B9-%25D0%25BC%25D0%25B0%25D0%25B3%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BD%3Fnode-id%3D0%253A1&chrome=DOCUMENTATION" allowfullscreen></iframe>

#### Страница отдельной книги 

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FW7G5HRGOIMFjztg6a4tz3D%2F%25D0%259A%25D0%25BD%25D0%25B8%25D0%25B6%25D0%25BD%25D1%258B%25D0%25B9-%25D0%25BC%25D0%25B0%25D0%25B3%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BD%3Fnode-id%3D26%253A89&chrome=DOCUMENTATION" allowfullscreen></iframe>

#### Добавление и редактирование книг

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FW7G5HRGOIMFjztg6a4tz3D%2F%25D0%259A%25D0%25BD%25D0%25B8%25D0%25B6%25D0%25BD%25D1%258B%25D0%25B9-%25D0%25BC%25D0%25B0%25D0%25B3%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BD%3Fnode-id%3D276%253A0" allowfullscreen></iframe>

#### Добавление и редактирование рецензий

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FW7G5HRGOIMFjztg6a4tz3D%2F%25D0%259A%25D0%25BD%25D0%25B8%25D0%25B6%25D0%25BD%25D1%258B%25D0%25B9-%25D0%25BC%25D0%25B0%25D0%25B3%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BD%3Fnode-id%3D275%253A166" allowfullscreen></iframe>

## Сценарии работы и представления

#### Сценарии работы с книгами
  При входе на сайт пользователя с логином admin появляется возможность редактировать и удалять книги. Кнопки редактировать и удалить доступны на страницах, на которых можно просматривать несколько книг. При нажатии кнопки редактировать открывается форма, в поля которой загружается информация из базы данных по выбранной книге. Файл обложки при удалении полностью удаляется, при редактировании заменяется на новый добавленный файл.

#### Сценарии работы с рецензиями
  Таблица "Рецензии" связана с двумя таблицами:

  * Таблица "Пользователи" - один пользователь может иметь несколько рецензий. Для создания рецензии пользователь должен авторизироваться в системе. Редактировать и удалять рецензию может только ее автор. Для этого он должен перейти на страницу с рецензией и нажать на кнопки "Удалить" или "Изменить". В личном кабинете пользователя отображается список всех рецензий, оставленных авторизованным пользователем. 

  * Таблица "Книги" - одна книга может иметь несколько рецензий. Список всех рецензий, оставленных для одной книги, пользователи могут увидеть на странице этой книги.

  На странице с рецензией пользователь может увидеть:

  * Автора рецензии

  * Дату публикации

  * Название рецензии

  * Текст рецензии

  Отображение добавленных в базу книг осуществляется на следующих страницах:
На главной странице. Все книги выбираются из базы.
В жанрах (они также формируются на основе базы). Открыв вкладку "Каталог" можно выбрать жанр книги, по нажатию на который будет сделана выборка из базы книг, соответствующих жанру.
На странице отдельной книги. При нажатии на отдельную книги открывается новая страница с подробной информацией о книге.

### Добавление рецензии для неавторизованного пользователя

<video  muted controls  width="800" height="450" src = "videos/lab5/rev1.mp4"></video>

### Добавление рецензии для авторизованного пользователя

<video  muted controls  width="800" height="450" src = "videos/lab5/rev2.mp4"></video>

### Редактирование и удаление рецензии
<video  muted controls  width="800" height="450" src = "videos/lab5/rev3.mp4"></video>

### Просмотр рецензий в личном кабинете
<video  muted controls  width="800" height="450" src = "videos/lab5/rev3.mp4"></video>



### Редактирование книги

<video  muted controls  width="800" height="450" src = "videos/lab5/book1.mp4"></video>

### Редактирование книги. Замена обложки (файла).

<video  muted controls  width="800" height="450" src = "videos/lab5/book2.mp4"></video>

### Удаление книги, которая имеет рецензию
<video  muted controls  width="800" height="450" src = "videos/lab5/book3.mp4"></video>

## Защита от SQL-инъекций
  * Приведение **id** к целочисленному типу с помощью функции **settype($..., 'integer')**;
  * Экранирование значений с помощью функции **mysqli_real_escape_string(...)**;
