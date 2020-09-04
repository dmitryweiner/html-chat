document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('additionalInfo');
    element.innerText = 'another changed text';

    const button = document.getElementById('button');
    const input = document.getElementById('input');
    const results = document.getElementById('results');
    button.addEventListener('click', function() {
        const value = input.value;
        let xhr = new XMLHttpRequest();

// 2. Настраиваем его: GET-запрос по URL
        xhr.open('GET', 'https://cat-fact.herokuapp.com/facts');

// 3. Отсылаем запрос
        xhr.send(JSON.stringify({message: value}));

// 4. Этот код сработает после того, как мы получим ответ сервера
        xhr.onload = function() {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                results.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`; // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
                results.innerText = `Готово, получили ${xhr.response.length} байт\n`; // response -- это ответ сервера
                const serverResult = JSON.parse(xhr.response);
                for (let result of serverResult.all) {
                    results.innerText += `${result.text}\n`;
                }
            }
        };

        xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
            } else {
                console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
            }

        };

        xhr.onerror = function() {
            results.innerText = "Запрос не удался";
        };
    });

});

