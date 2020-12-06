# Лабораторная работа №3

## Формулировка задачи с описанием “как будем делать”

> На вход вашей функции передается html-текст. Верните автоматически построенное оглавление со ссылками на заголовки якоря (тег a). Продемонстрировать на странице сайта, сделанного  на 1-2 ЛР.

### Формулировка задачи

> По выбранной рецензии строится содержание на основе заголовков от h1 до h6 с учетом иерархии.

Файл *toc_generator.php* содержит две функции:set_id и toc_generator.

#### Функция **set_id**
Данная функция добавляет ко всем h1,...,h2 уникальный id.
1. С помощью функции getElementsByTagName() получаем все заголовки, соответсвующие тегам h1,h2,h3,h4,h5,h6.
2. С помощью функции setAttribute('id', 'h' . $i . '_' . $j) присваиваем заголовкам атрибут id.
3. id имеет вид **h**i_j, где i - это уровень тега, а j - уникальный номер заголовка для тега **h**i.

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

*toc_generator.php*

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

function generate_toc($html)
{

    $links =  extractHeaders($html);
    echo "<h1>Содержание</h1>";
    echo "<ul class='list-group'>";
    foreach ($links as $id => $value) {
        $a = "<a class='btn-link' href = '#" . $id . "'>" . $value . "</a>";
        echo "<li class=\"list-group-item\">" . $a . "</li>";
    }
    echo "</ul>";
}
```

## Работающее решение в виде папки с файлами

[Ссылка на репозиторий](https://github.com/book-e-shop/book-e-shop)

## Скринкаст работы решения

<!-- <video autoplay muted  loop width="800" height="450" src = "videos/lab3/1.mp4"></video>
