# Лабораторная работа №3

## Формулировка задачи с описанием “как будем делать”

> На вход вашей функции передается html-текст. Верните автоматически построенное оглавление со ссылками на заголовки якоря (тег a). Продемонстрировать на странице сайта, сделанного  на 1-2 ЛР.

### Формулировка задачи

> Построение карты сайта по всем страницам.

Файл *sitemap_generator.php* содержит функцию, которая выполняет построение сайта по всем файлам в корневой директории проекта. Последовательность действий следующая:

1. С помощью функции *scandir* выполняется перебор php-файлов в директории, полученной с помощью функции *getcwd*.
2. Для исключения "системных" скриптов, используется массив *not_indexing*.
3. С помощью функции *render_file*, из файла *render_file.php*, выполняется копирование содержимого внутреннего буфера загруженного php-файла в строковую переменную.
4. Полученная строковая переменная передается в функцию *extractLinks*, которая возвращает ассоциативный массив, где ключ - текст, значение - адрес.
5. По полученному массиву строится карта сайта.

В файле *parser.php* содержится функция *extractLinks*, которая выполняет извлечение элементов с тегом **а** из содержимого html-страницы. Последовательность действий следующая:

1. Загружаем содержимое html-страницы (аргумент функции) в экземпляр класса *DOMDocument*.
2. Функцией *getElementsByTagName* извлекаем элементы с тегом **а**.
3. Далее в цикле по выбранным элементам забираем текст и адрес ссылки, и заносим в ассоциативный массив.
4. После завершения цикла возвращаем получившийся ассоциативный массив, где ключ - текст, значение - адрес.

## Тестовый пример со скриншотом

<img  src = "img/lab3/1.png" width="800" height="450">

## PHP-Код, вставленный прямо в протокол

*parser.php*

```php
function extractLinks($html)
{
    $htmlDom = new DOMDocument;
    $extractedLinks = array();

    @$htmlDom->loadHTML($html);
    $links = $htmlDom->getElementsByTagName('a');

    foreach ($links as $link) {

        $linkText = $link->nodeValue;
        $linkHref = $link->getAttribute('href');

        if(strlen(trim($linkHref)) != 0 && $linkHref[0] != '#' && strlen(trim($linkText)) != 0) {
            $extractedLinks[$linkText] = $linkHref;
        }        
    }

    return $extractedLinks;
}

```

*render_file.php*

```php
function render_file($path)
{
    ob_start();
    include($path);
    $html = ob_get_contents();
    ob_end_clean();
    return $html;
}

```

*sitemap_generator.php*

```php

require_once "render_file.php";


function generate_sitemap()
{
    $not_indexing = [
        "render_file.php", "sitemap_generator.php",
        "404.php", "header.php", "footer.php",
        "logout.php", "parser.php",
        "signup.php", "signin.php",
        "db.php", "sitemap.php"
    ];

    include getcwd() . '/parser.php';
    $path = getcwd();


    $files = scandir($path);
    foreach ($files as $file) {

        if (strpos($file, 'php') && in_array($file, $not_indexing) === false) {
            echo "<h2>" . $file . "/<h2>";
            echo "<ul class=\"list-group list-group-flush\">";
            $html = render_file($file);


            $links =  extractLinks($html);
            foreach ($links as $value => $href) {
                $a = "<a class='btn-link' href = '" . $href . "'>" . $value . "</a>";
                echo "<li class=\"list-group-item\">" . $a . "</li>";
            }
            echo "</ul>";
        }
    }
}

```
## Работающее решение в виде папки с файлами

[Ссылка на репозиторий](https://github.com/book-e-shop/book-e-shop)

## Скринкаст работы решения

<!-- <video autoplay muted  loop width="800" height="450" src = "videos/lab3/1.mp4"></video>
