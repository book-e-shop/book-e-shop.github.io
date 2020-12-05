# Лабораторная работа №3

## Формулировка задачи с описанием “как будем делать”

> На вход вашей функции передается html-текст. Верните автоматически построенное оглавление со ссылками на заголовки якоря (тег a). Продемонстрировать на странице сайта, сделанного  на 1-2 ЛР.

### Формулировка задачи

> По выбранной рецензии строится содержание на основе заголовков от h1 до h6 с учетом иерархии.

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
<?php

function extractHeaders($htmlContent)
{
    $htmlContent = mb_convert_encoding($htmlContent, 'HTML-ENTITIES', "UTF-8");

    $htmlDom = new DOMDocument;
    @$htmlDom->loadHTML($htmlContent);

    $extractedHeaders = array();

    $elements = $htmlDom->getElementsByTagName('*');

    $h_array = array('h1', 'h2', 'h3', 'h4', 'h5', 'h6');

    foreach ($elements as $element) {
        if (in_array($element->tagName, $h_array)) {

            $header_id = $element->getAttribute('id');
            $header_text = $element->nodeValue;

            if (strlen($header_id) > 0 && strlen($header_text) > 0)
            {
                $element->removeAttribute('id');
                $extractedHeaders[$header_id] = $htmlDom->saveHtml($element);
            }
                
        }
    }

    return $extractedHeaders;
}


```

*render_file.php*

```php
function set_id($text)
{
    $htmlContent = mb_convert_encoding($text, 'HTML-ENTITIES', "UTF-8");

    $htmlDom = new DOMDocument;
    @$htmlDom->loadHTML($htmlContent);

    $extractedHeaders = array();

    for ($i = 1; $i < 7; $i++) {

        $headers = $htmlDom->getElementsByTagName('h' . $i);
        $j = 0;
        foreach ($headers as $header) {

            $header->setAttribute('id', 'h' . $i . '_' . $j);
            $j++;
        }
    }
    $text = $htmlDom->saveHTML();

    return $text;
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
